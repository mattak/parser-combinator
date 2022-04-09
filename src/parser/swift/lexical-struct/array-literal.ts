import {ParserInput, ParserOutput} from "../../../types";
import {cat} from "../../../combinators";
import {whitespace0} from "./whitespace";
import {char} from "../../../char";
import {listWithTailDelimiter, map, opt} from "../../../util";
import {expression, SwiftExpression} from "../expression/expression";

export interface SwiftArrayLiteral {
  expressions: SwiftExpression[],
}

export function arrayLiteral(input: ParserInput): ParserOutput<SwiftArrayLiteral> {
  return map(
    cat([
      char('['),
      whitespace0,
      opt(listWithTailDelimiter(expression, cat([whitespace0, char(','), whitespace0]))),
      // whitespace0,
      char(']'),
    ]),
    ([, , lst/*, */,]) => {
      return {
        expressions: lst.status === 'some' ? lst.value : [],
      }
    }
  )(input);
}
