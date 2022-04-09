// <expression> ::= <try-operator>? <await-operator>? <prefix-expression> <infix-expressions>?
// <expression-list> ::= <expression> (, <expression>)*
// <prefix-expression> ::= <prefix-operator>? <postfix-expression>
// <prefix-expression> ::= <in-out-expression>

import {ParserInput, ParserOutput} from "../../../types";
import {cat} from "../../../combinators";
import {prefixExpression, SwiftPrefixExpression} from "./prefix-expression";
import {map} from "../../../util";

export interface SwiftExpression {
  prefix: SwiftPrefixExpression,
}

export function expression(input: ParserInput): ParserOutput<SwiftExpression> {
  return map(
    cat([
      // opt(tryOperator),
      // opt(awaitOperator),
      prefixExpression,
      // opt(infixExpression),
    ]),
    ([p]) => {
      return <SwiftExpression>{
        prefix: p
      }
    })(input);
}