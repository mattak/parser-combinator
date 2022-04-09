import {ParserInput, ParserOutput} from "../../../types";
import {literal, SwiftLiteral} from "../lexical-struct/literal";
import {or} from "../../../combinators";
import {map} from "../../../util";
import {SwiftExpression} from "./expression";

type SwiftLiteralExpressionType = 'literal' | 'array' | 'dictionary' | 'playground';

export interface SwiftLiteralExpression {
  type: SwiftLiteralExpressionType,
}

export interface SwiftLiteralExpressionLiteral extends SwiftLiteralExpression {
  value: SwiftLiteral,
}

export interface SwiftLiteralExpressionArray extends SwiftLiteralExpression {
  expressions: SwiftExpression,
}

export function literalExpression(input: ParserInput): ParserOutput<SwiftLiteralExpression> {
  return or([
    // literal
    map(
      literal,
      (s) => <SwiftLiteralExpression>{
        type: 'literal',
        value: s,
      }
    ),
    // array
    // dictionary
    // playground
  ])(input);
}
