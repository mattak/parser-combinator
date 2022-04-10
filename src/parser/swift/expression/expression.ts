// <expression> ::= <try-operator>? <await-operator>? <prefix-expression> <infix-expressions>?
// <expression-list> ::= <expression> (, <expression>)*
// <prefix-expression> ::= <prefix-operator>? <postfix-expression>
// <prefix-expression> ::= <in-out-expression>

import {ParserInput, ParserOutput} from "../../../types";
import {cat} from "../../../combinators";
import {prefixExpression} from "./prefix-expression";
import {map} from "../../../util";
import {SwiftExpression} from "../../../syntax/swift/expression/expression";

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