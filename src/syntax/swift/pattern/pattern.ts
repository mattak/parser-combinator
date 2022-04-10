export type SwiftPatternType =
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

