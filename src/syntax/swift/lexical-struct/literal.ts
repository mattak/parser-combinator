import {SwiftExpression} from "../expression/expression";

export interface SwiftArrayLiteral {
  expressions: SwiftExpression[],
}

export type SwiftLiteralBoolean = 'true' | 'false';

export type SwiftLiteralType = 'numeric' | 'string' | 'boolean' | 'nil';

export type SwiftLiteral = SwiftNilLiteral | SwiftBooleanLiteral | SwiftStringLiteral | SwiftNumericLiteral

export interface SwiftNilLiteral {
  type: 'nil',
}

export interface SwiftBooleanLiteral {
  type: 'boolean',
  value: boolean,
}

export interface SwiftStringLiteral {
  type: 'string',
  value: string,
}

export interface SwiftNumericLiteral {
  type: 'numeric',
  value: string,
}