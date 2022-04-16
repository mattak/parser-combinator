// <postfix-expression> ::= <primary-expression>
// <postfix-expression> ::= <postfix-expression> <postfix-operator>
// <postfix-expression> ::= <function-call-expression>
// <postfix-expression> ::= <initializer-expression>
// <postfix-expression> ::= <explicit-member-expression>
// <postfix-expression> ::= <postfix-self-expression>
// <postfix-expression> ::= <subscript-expression>
// <postfix-expression> ::= <forced-value-expression>
// <postfix-expression> ::= <optional-chaining-expression>

import {ParserInput, ParserOutput} from "../../../types";
import {or} from "../../../combinators";
import {primaryExpression} from "./primary-expression";
import {map} from "../../../util";
import {SwiftPostfixExpression, SwiftPostfixExpressionPrimary} from "../../../syntax/swift";

export function postfixExpression(input: ParserInput): ParserOutput<SwiftPostfixExpression> {
  return or([
    // 'primary'
    map(
      primaryExpression,
      (s) => {
        return <SwiftPostfixExpressionPrimary>{
          type: 'primary',
          value: s,
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