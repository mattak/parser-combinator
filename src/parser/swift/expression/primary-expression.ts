import {ParserInput, ParserOutput} from "../../../types";
import {identifier} from "../lexical-struct/identifier";
import {cat, or} from "../../../combinators";
import {map, opt} from "../../../util";
import {genericArgumentClause} from "../generic-parameters/generic-argument";
import {literalExpression} from "./literal-expression";
import {SwiftPrimaryExpression} from "../../../syntax/swift";

export function primaryExpression(input: ParserInput): ParserOutput<SwiftPrimaryExpression> {
  return or([
    // literal
    map(
      literalExpression,
      (s) => {
        return <SwiftPrimaryExpression>{
          type: 'literal',
          value: s,
        }
      }
    ),
    // identifier
    map(
      cat([
        identifier,
        opt(genericArgumentClause),
      ]),
      ([s]) => {
        return <SwiftPrimaryExpression>{
          type: 'identifier',
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