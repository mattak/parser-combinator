import {SwiftExpression} from "../expression/expression";

export interface SwiftArrayLiteral {
  expressions: SwiftExpression[],
}

export type SwiftLiteralBoolean = 'true' | 'false';

export type SwiftLiteralType = 'numeric' | 'string' | 'boolean' | 'nil';

export interface SwiftLiteral {
  type: SwiftLiteralType,
  value: string,
}

export interface SwiftNilLiteral extends SwiftLiteral {
}

export interface SwiftBooleanLiteral extends SwiftLiteral {
}

export interface SwiftStringLiteral extends SwiftLiteral {
}

export interface SwiftNumericLiteral extends SwiftLiteral {
}