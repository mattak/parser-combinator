export type SwiftTypeType = 'function'
  | 'array'
  | 'dictionary'
  | 'type-identifier'
  | 'tuple'
  | 'optional'
  | 'implicitly-unwrapped-optional'
  | 'protocol-composition'
  | 'opaque'
  | 'metatype'
  | 'any'
  | 'self';

export interface SwiftType {
  type: SwiftTypeType;
}
