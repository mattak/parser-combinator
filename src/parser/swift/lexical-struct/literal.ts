// <literal> ::= <numeric-literal> | <string-literal> | <boolean-literal> | <nil-literal>
// <numeric-literal> ::= '-' ? <integer-literal> | '-' ? <floating-point-literal>
// <boolean-literal> ::= true | false
// <nil-literal> ::= nil

import {Parser} from "../../../types";
import {or} from "../../../combinators";
import {stringLiteral} from "./string-literal";
import {map} from "../../../util";
import {integerLiteral} from "./integer-literal";
import {floatingPointLiteral} from "./floating-point-literal";
import {booleanLiteral} from "./boolean-literal";
import {nilLiteral} from "./nil-literal";
import {SwiftLiteral} from "../../../syntax/swift";

export const literal: Parser<SwiftLiteral> = or([
  map(
    booleanLiteral,
    (s) => {
      return <SwiftLiteral>{
        type: 'boolean',
        value: s
      }
    }
  ),
  map(
    nilLiteral,
    (s) => {
      return <SwiftLiteral>{
        type: 'nil',
        value: s
      }
    }
  ),
  map(
    integerLiteral,
    (s) => {
      return <SwiftLiteral>{
        type: 'numeric',
        numericType: 'integer',
        value: s.toString(),
      }
    }
  ),
  map(
    floatingPointLiteral,
    (s) => {
      return <SwiftLiteral>{
        type: 'numeric',
        numericType: 'float',
        value: s,
      }
    }
  ),
  map(
    stringLiteral,
    (s) => {
      return {
        type: 'string',
        value: s,
      }
    }
  ),
]);