import {Parser} from "../../../types";
import {cat, or} from "../../../combinators";
import {map, opt, str} from "../../../util";
import {identifier} from "../lexical-struct/identifier";

type SwiftPatternType =
  'wildcard'
  | 'identifier'
  | 'value'
  | 'tuple'
  | 'enum'
  | 'optional'
  | 'type-casting'
  | 'expression'

export interface SwiftPattern {
  type: SwiftPatternType;
  value: string;
}

export interface SwiftPatternIdentifier extends SwiftPattern {
  type: 'identifier';
  value: string;
}

export interface SwiftPatternWildcard extends SwiftPattern {
  type: 'wildcard';
  value: '_';
}

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
