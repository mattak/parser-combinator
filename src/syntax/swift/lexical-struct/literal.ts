import {SwiftExpression} from "../../../parser/swift/expression/expression";

export interface SwiftArrayLiteral {
  expressions: SwiftExpression[],
}

export type SwiftLiteralBoolean = 'true' | 'false';

export type SwiftLiteralType = 'numeric' | 'string' | 'boolean' | 'nil';

export interface SwiftLiteral {
  type: SwiftLiteralType,
  value: string,
}
