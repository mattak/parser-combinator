// <type-identifier> ::= <type-name> <generic-argument-clause>? | <type-name> <generic-argument-clause>? . <type-identifier>
// <type-name> ::= <identifier>
import {ParserInput, ParserOutput} from "../../../types";
import {map, opt} from "../../../util";
import {cat, or} from "../../../combinators";
import {identifier} from "../lexical-struct/identifier";
import {genericArgumentClause} from "../generic-parameters/generic-argument";
import {char} from "../../../char";
import {SwiftTypeIdentifier} from "../../../syntax/swift";

function typeIdentifier1(input: ParserInput): ParserOutput<SwiftTypeIdentifier> {
  return map(
    cat([
      identifier,
      opt(genericArgumentClause)
    ]),
    ([id, args]) => {
      return <SwiftTypeIdentifier>{
        type: 'type-identifier',
        name: id,
        genericArguments: args.status === 'some' ? args.value : [],
        innerType: null,
      }
    })(input);
}

function typeIdentifier2(input: ParserInput): ParserOutput<SwiftTypeIdentifier> {
  return map(
    cat([
      identifier,
      opt(genericArgumentClause),
      char('.'),
      typeIdentifier,
    ]),
    ([id, args, , innerType]) => {
      return <SwiftTypeIdentifier>{
        type: 'type-identifier',
        name: id,
        genericArguments: args.status === 'some' ? args.value : [],
        innerType: innerType,
      }
    }
  )(input);
}

export function typeIdentifier(input: ParserInput): ParserOutput<SwiftTypeIdentifier> {
  return or([
    typeIdentifier2,
    typeIdentifier1,
  ])(input);
}
