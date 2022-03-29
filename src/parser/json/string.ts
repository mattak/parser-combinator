import {Parser} from "../../types";
import {char, digit, Digit, is} from "../../char";
import {cat, or, rep} from "../../combinators";
import {diff, map, str} from "../../util";
import {anyChar} from "../../primitives";

const cntrl: Parser<string> = is((c): c is string => (c.codePointAt(0) || 0) <= 0x1f);

type HexUpperAlpha = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
type HexLowerAlpha = Lowercase<HexUpperAlpha>;
type HexAlpha = HexUpperAlpha | HexLowerAlpha;
type HexDigit = Digit | HexAlpha;

// <hex> ::= <digit> | <hex_alpha>
const hex: Parser<HexDigit> = or([digit, is((c): c is HexAlpha => /^[A-Fa-f]$/.test(c))])
// <codePoint> ::= '\\u' <hex>{4}
const codePoint: Parser<string> = map(
  cat([
    str('\\u'),
    rep(hex, 4, 4)
  ]),
  ([, code]) => String.fromCodePoint(Number.parseInt(code.join(''), 16))
);

// <escape> ::= '\b' | '\t' | '\n' | '\f' | '\r' | '\"' | '/' | '\\'
const escape: Parser<string> = or([
  map(str('\\b'), () => '\b'),
  map(str('\\t'), () => '\t'),
  map(str('\\n'), () => '\n'),
  map(str('\\f'), () => '\f'),
  map(str('\\r'), () => '\r'),
  map(str('\\"'), () => '"'),
  map(str('\\/'), () => '/'),
  map(str('\\\\'), () => '\\'),
  codePoint,
]);
// <stringContent> ::= (<anyChar> - ('#' | '\\' | ctrl)) | <escape>
const stringContent: Parser<string> = map(
  rep(
    or([
      diff(
        anyChar,
        or([
          char('"'),
          char('\\'),
          cntrl,
        ])
      ),
      escape
    ])
  ),
  strs => strs.join('')
);
export const string: Parser<string> = map(
  cat([
    char('"'),
    stringContent,
    char('"')
  ]),
  ([, s,]) => s
);
