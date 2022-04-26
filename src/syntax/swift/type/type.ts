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

export type SwiftType = SwiftTypeIdentifier

export interface SwiftTypeIdentifier {
  type: 'type-identifier',
  name: string,
  genericArguments: SwiftType[],
  innerType: SwiftTypeIdentifier | null,
}

export interface SwiftTypeAnnotation {
  // type-annotation :== <attributes>? 'inout'? <type>
  attributes: null,
  isInout: boolean,
  type: SwiftType,
}