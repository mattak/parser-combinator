import {ParserInput, ParserOutput} from "../../../types";
import {identifier} from "../lexical-struct/identifier";
import {cat, or} from "../../../combinators";
import {map, opt} from "../../../util";
import {genericArgumentClause} from "../generic-parameters/generic-argument";
import {literalExpression, SwiftLiteralExpression} from "./literal-expression";

type SwiftPrimaryExpressionType =
  'identifier'
  | 'literal'
  | 'self'
  | 'superclass'
  | 'closure'
  | 'parenthesized'
  | 'tuple'
  | 'implicit-member'
  | 'wildcard'
  | 'key-path'
  | 'selector'
  | 'key-path-string';

export interface SwiftPrimaryExpression {
  primaryType: SwiftPrimaryExpressionType;
}

export interface SwiftPrimaryExpressionIdentifier extends SwiftPrimaryExpression {
  primaryType: 'identifier';
  value: string;
}

export interface SwiftPrimaryExpressionLiteral extends SwiftPrimaryExpression {
  primaryType: 'literal';
  value: SwiftLiteralExpression;
}

export function primaryExpression(input: ParserInput): ParserOutput<SwiftPrimaryExpression> {
  return or([
    // identifier
    map(
      cat([
        identifier,
        opt(genericArgumentClause),
      ]),
      ([s]) => {
        return <SwiftPrimaryExpression>{
          primaryType: 'identifier',
          value: s,
        }
      }
    ),
    // literal
    map(
      literalExpression,
      (s) => {
        return <SwiftPrimaryExpression>{
          primaryType: 'literal',
          value: s,
        }
      }
    ),
    // self
    // superclass
    // closure
    // parenthesized
    // tuple
    // implicit-member
    // wildcard
    // key-path
    // selector
    // key-path-string
  ])(input);
}