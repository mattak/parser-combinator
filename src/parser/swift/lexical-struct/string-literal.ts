import {Parser} from "../../../types";
import {cat, or, rep} from "../../../combinators";
import {diff, map, nextMatch, opt, str} from "../../../util";
import {char, is} from "../../../char";
import {anyChar} from "../../../primitives";
import {inlineSpace, lineBreak} from "./whitespace";

export function createStringOpeningDelimiter(quoteCount: number): Parser<string> {
  return input => {
    if (input.length < quoteCount) {
      return {
        result: 'fail',
      };
    }

    let sharpCount = input.findIndex(v => v !== '#')
    if (sharpCount < 0) {
      sharpCount = 0;
    }

    const quotes = input.slice(sharpCount, sharpCount + quoteCount);
    if (quotes.length == quoteCount && quotes.every(v => v === '"')) {
      return {
        result: 'success',
        data: input.slice(0, sharpCount + quoteCount).join(''),
        rest: input.slice(sharpCount + quoteCount),
      }
    }

    return {
      result: 'fail',
    };
  }
}

export function createStringClosingDelimiter(quoteCount: number, sharpCount: number): Parser<string> {
  return input => {
    if (input.length < quoteCount) {
      return {
        result: 'fail',
      };
    }

    const quotes = input.slice(0, quoteCount);
    if (!quotes.every(v => v === '"')) {
      return {
        result: 'fail',
      }
    }

    const sharps = input.slice(quoteCount, quoteCount + sharpCount)
    if (sharps.length == sharpCount && sharps.every(v => v === '#')) {
      return {
        result: 'success',
        data: input.slice(0, quoteCount + sharpCount).join(''),
        rest: input.slice(quoteCount + sharpCount),
      }
    }

    return {
      result: 'fail'
    }
  }
}

const extendedStringLiteralDelimiter1: Parser<string> = map(
  rep(char('#'), 1),
  (s) => s.join('')
);
const extendedStringLiteralDelimiter0: Parser<string> = map(
  rep(char('#')),
  (s) => s.join('')
);
const stringLiteralOpeningDelimiter: Parser<string> = map(
  cat([
    extendedStringLiteralDelimiter0,
    str('"'),
  ]),
  ([p, op]) => p + op
);
const stringLiteralClosingDelimiter: Parser<string> = or([
  str('"'),
  extendedStringLiteralDelimiter0,
]);
const multilineStringLiteralOpeningDelimiter: Parser<string> = map(
  cat([
    extendedStringLiteralDelimiter0,
    str('"""'),
  ]),
  (s) => s.join(''),
);
const multilineStringLiteralClosingDelimiter: Parser<string> = map(
  cat([
    str('"""'),
    extendedStringLiteralDelimiter0,
  ]),
  (s) => s.join(''),
);
const escapeSequence: Parser<string> = map(
  cat([
    char('\\'),
    extendedStringLiteralDelimiter1,
  ]),
  ([s, a]) => s + a
);
const unicodeScalarDigits = rep(
  is((c): c is string => /^[\da-fA-F]$/.test(c)),
  1,
  8,
);
const escapedCharacter: Parser<string> = or([
  str('\\0'),
  str('\\\\'),
  str('\\t'),
  str('\\n'),
  str('\\r'),
  str('\\"'),
  str("\\'"),
  map(
    cat([
      str("\\u{"),
      unicodeScalarDigits,
      str('}')
    ]),
    ([prefix, digits, suffix]) => prefix + digits.join('') + suffix,
  )
]);
const escapedNewline: Parser<string> = map(
  cat([
    escapeSequence,
    rep(inlineSpace),
    lineBreak,
  ]),
  ([s, spaces, end]) => s + spaces + end
);
export const quotedTextItem: Parser<string> = or([
  escapedCharacter,
  diff(
    anyChar,
    or([
      char('"'),
      char('\\'),
      char('\n'),
      char('\r'),
    ])
  )
]);
const multilineQuotedTextItem: Parser<string> = or([
  escapedCharacter,
  escapedNewline,
  diff(anyChar, char('\\')),
]);
const staticStringLiteralSingle: Parser<string> = input => {
  const openDelimiter = createStringOpeningDelimiter(1);
  const open = openDelimiter(input);
  if (open.result === 'fail') return open;
  input = open.rest;

  const texts: string[] = [];
  let rest: readonly string[] = [];

  while (true) {
    const text = rep(quotedTextItem)(input);
    if (text.result === 'fail') return text;
    texts.push(text.data.join(''));
    input = text.rest;

    const closeDelimiter = createStringClosingDelimiter(1, open.data.length - 1);
    const close = closeDelimiter(input);
    if (close.result == 'fail') {
      if (input.length > 0 && input[0] === '"') {
        texts.push(input[0]);
        input = input.slice(1);
        continue;
      }
      return close;
    }

    rest = close.rest;
    break
  }

  return {
    result: 'success',
    data: texts.join(''),
    rest: rest,
  };
}
const staticStringLiteral: Parser<string> = or([
  staticStringLiteralSingle,
  // staticStringLiteralMulti,
]);

const interpolatedTextItem: Parser<string> = or([
  map(
    cat([
      str('\\('),
      // expression
      char(')'),
    ]),
    (s) => s.join('')
  ),
  quotedTextItem
]);
// e.g. "hello\(value)world"
// <interpolated-string-literal> ::= <string-literal-opening-delimiter> <interpolated-text>? <string-literal-closing-delimiter>
const interpolatedStringLiteralSingle: Parser<string> = map(
  cat([
    stringLiteralOpeningDelimiter,
    rep(interpolatedTextItem),
    stringLiteralClosingDelimiter,
  ]),
  ([open, s, close]) => open + s.join('') + close
);
const multilineInterpolatedTextItem: Parser<string> = or([
  map(
    cat([
        str('\\('),
        // expression
        char(')'),
      ]
    ),
    (s) => s.join('')
  ),
  multilineQuotedTextItem,
]);
// <interpolated-string-literal> ::= <multiline-string-literal-opening-delimiter> <multiline-interpolated-text>? <multiline-string-literal-closing-delimiter>
// e.g. """hello\(value)world"""
const interpolatedStringLiteralMulti: Parser<string> = input => {
  const openDelimiter = createStringOpeningDelimiter(3);
  const open = openDelimiter(input);
  if (open.result === 'fail') return open;
  input = open.rest;

  const text = rep(multilineInterpolatedTextItem)(input);
  if (text.result === 'fail') return text;
  input = text.rest;

  const closeDelimiter = createStringClosingDelimiter(3, open.data.length - 3);
  const close = closeDelimiter(input);
  if (close.result === 'fail') return close;

  return {
    result: 'success',
    data: text.data.join(''),
    rest: close.rest,
  };
}

const interpolatedStringLiteral: Parser<string> = or([
  interpolatedStringLiteralMulti,
  interpolatedStringLiteralSingle,
]);

export const stringLiteral: Parser<string> = or([
  staticStringLiteral,
  // interpolatedStringLiteral,
]);