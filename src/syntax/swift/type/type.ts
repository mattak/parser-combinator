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

export interface SwiftTypeIdentifierType extends SwiftType {
  type: 'type-identifier';
  name: string;
  genericArguments: SwiftType[];
  innerType: SwiftTypeIdentifierType | null;
}
