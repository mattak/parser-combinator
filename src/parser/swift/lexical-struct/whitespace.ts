import {Parser, ParserInput, ParserOutput} from "../../../types";
import {cat, not, or, rep} from "../../../combinators";
import {char} from "../../../char";
import {diff, map, str} from "../../../util";
import {anyChar} from "../../../primitives";
import * as fs from "fs";

export const lineBreak: Parser<string> = or([
  str('\r\n'),
  char('\r'),
  char('\n'),
]);
export const inlineSpace: Parser<string> = or([
  char('\t'),
  char(' ')
]);
const commentTextItem: Parser<string> = diff(
  anyChar,
  or([
    char('\n'),
    char('\r'),
  ])
);
const commentText: Parser<string> = map(
  rep(commentTextItem, 1),
  (s) => s.join('')
);
export const comment: Parser<string> = map(
  cat([
    str('//'),
    commentText,
    lineBreak,
  ]),
  ([, text, terminator]) => {
    return text + terminator;
  }
);

type DebugFunc = <T>(p: Parser<T>, inputLogger: (i: ParserInput) => void, outputLogger: (r: ParserOutput<T>) => void) => Parser<T>;
const debug: DebugFunc = (p, inputLogger, outputLogger) => input => {
  inputLogger(input);
  const result = p(input);
  outputLogger(result);
  return result;
}

// <multiline-comment-text-item-except-terminator> ::= Any Unicode scalar value except '/*', '*/'
function multilineCommentTextItemExceptTerminator(input: ParserInput): ParserOutput<string> {
  if (input.length < 1) {
    return {
      result: 'fail'
    }
  }

  if (input.length >= 2 && (input[0] === '*' && input[1] === '/') || (input[0] === '/' && input[1] === '*')) {
    return {
      result: 'fail'
    };
  }

  return {
    result: 'success',
    data: input[0],
    rest: input.slice(1),
  };
}

function multilineCommentText(input: ParserInput): ParserOutput<string> {
  return or([
    multilineComment,
    multilineCommentTextItemExceptTerminator,
  ])(input);
}

export function multilineComment(input: ParserInput): ParserOutput<string> {
  return map(
    cat([
      str('/*'),
      rep(multilineCommentText, 1),
      str('*/'),
    ]),
    ([, texts,]) => texts.join('')
  )(input);
}

const whiteSpaceItem: Parser<string> = or([
  char(' '),
  char('\0'),
  char('\t'),
  char('\f'),
  lineBreak,
  inlineSpace,
  comment,
  multilineComment,
]);
export const whitespace: Parser<string> = map(
  rep(whiteSpaceItem, 1),
  (s) => s.join(''),
);
