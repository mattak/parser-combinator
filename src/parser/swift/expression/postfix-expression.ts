// <postfix-expression> ::= <primary-expression>
// <postfix-expression> ::= <postfix-expression> <postfix-operator>
// <postfix-expression> ::= <function-call-expression>
// <postfix-expression> ::= <initializer-expression>
// <postfix-expression> ::= <explicit-member-expression>
// <postfix-expression> ::= <postfix-self-expression>
// <postfix-expression> ::= <subscript-expression>
// <postfix-expression> ::= <forced-value-expression>
// <postfix-expression> ::= <optional-chaining-expression>

import {Parser, ParserInput, ParserOutput} from "../../../types";
import {or} from "../../../combinators";
import {primaryExpression, SwiftPrimaryExpression} from "./primary-expression";
import {map} from "../../../util";

type SwiftPostfixExpressionType = 'primary'
  | 'operator'
  | 'function'
  | 'initializer'
  | 'explicit-member'
  | 'self'
  | 'subscript'
  | 'forced-value'
  | 'optional-chain';

export interface SwiftPostfixExpression {
  postfixType: SwiftPostfixExpressionType;
}

export interface SwiftPostfixExpressionPrimary extends SwiftPostfixExpression, SwiftPrimaryExpression {
}

export function postfixExpression(input: ParserInput): ParserOutput<SwiftPostfixExpression> {
  return or([
    // 'primary'
    map(
      primaryExpression,
      (s) => {
        return <SwiftPostfixExpressionPrimary>{
          postfixType: 'primary',
          ...s
        }
      }
    ),
    // 'operator'
    // 'function'
    // 'initializer'
    // 'explicit-member'
    // 'self'
    // 'subscript'
    // 'forced-value'
    // 'optional-chain';
  ])(input);
}