import {Parser} from "../../../types";
import {cat, or} from "../../../combinators";
import {map, str} from "../../../util";
import {identifier} from "../lexical-struct/identifier";
import {SwiftPattern} from "../../../syntax/swift";

export const identifierPattern: Parser<SwiftPattern> = map(
  cat([
    identifier,
    // opt(typeAnnotation)
  ]),
  ([id]) => {
    return {
      type: 'identifier',
      value: id,
    }
  })

export const wildcardPattern: Parser<SwiftPattern> = map(
  str('_'),
  (s) => {
    return {
      type: 'wildcard',
      value: '_',
    }
  }
)

export const pattern: Parser<SwiftPattern> = or([
  wildcardPattern,
  identifierPattern,
  // valueBindingPattern,
  // tuplePattern,
  // enumCasePattern,
  // optionalPattern,
  // typeCastingPattern,
  // expressionPattern,
]);
