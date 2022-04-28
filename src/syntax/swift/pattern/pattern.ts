export type SwiftPatternType =
  'wildcard'
  | 'identifier'
  | 'value'
  | 'tuple'
  | 'enum'
  | 'optional'
  | 'type-casting'
  | 'expression'

export type SwiftPattern = SwiftPatternIdentifier | SwiftPatternWildcard

export interface SwiftPatternIdentifier {
  type: 'identifier',
  value: string,
}

export interface SwiftPatternWildcard {
  type: 'wildcard',
  value: '_',
}
