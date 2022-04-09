// <prefix-expression> ::= <prefix-operator opt postfix-expression
// <prefix-expression> ::= <in-out-expression>

import {ParserInput, ParserOutput} from "../../../types";
import {cat, or} from "../../../combinators";
import {map} from "../../../util";
import {postfixExpression, SwiftPostfixExpression} from "./postfix-expression";

export interface SwiftPrefixExpression {
  prefixOperator: null,
  postfixExpression: SwiftPostfixExpression,
}

export function prefixExpression(input: ParserInput): ParserOutput<SwiftPrefixExpression> {
  return or([
    // prefix-operator? postfix-expression
    map(
      cat([
        // opt(prefixOperator),
        postfixExpression,
      ]),
      ([s]) => {
        return <SwiftPrefixExpression>{
          prefixOperator: null,
          postfixExpression: s,
        }
      }),
    // in-out-expression
    // map(
    //   cat([char('&'), expression]),
    //   ([, e]) => {
    //     return e
    //   })
  ])(input);
}
