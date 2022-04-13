import {SwiftLiteral} from "../lexical-struct/literal";

export interface SwiftExpression {
  prefix: SwiftPrefixExpression,
}

export interface SwiftPrefixExpression {
  prefixOperator: null,
  postfixExpression: SwiftPostfixExpression,
}

export type SwiftPostfixExpressionType = 'primary'
  | 'operator'
  | 'function'
  | 'initializer'
  | 'explicit-member'
  | 'self'
  | 'subscript'
  | 'forced-value'
  | 'optional-chain';

export interface SwiftPostfixExpression {
  postfixType: SwiftPostfixExpressionType,
}

export interface SwiftPostfixExpressionPrimary extends SwiftPostfixExpression, SwiftPrimaryExpression {
}

export type SwiftLiteralExpressionType = 'literal' | 'array' | 'dictionary' | 'playground';

export interface SwiftLiteralExpression {
  type: SwiftLiteralExpressionType,
}

export interface SwiftLiteralExpressionLiteral extends SwiftLiteralExpression {
  value: SwiftLiteral,
}

export interface SwiftLiteralExpressionArray extends SwiftLiteralExpression {
  expressions: SwiftExpression,
}

export type SwiftPrimaryExpressionType =
  'identifier'
  | 'literal'
  | 'self'
  | 'superclass'
  | 'closure'
  | 'parenthesized'
  | 'tuple'
  | 'implicit-member'
  | 'wildcard'
  | 'key-path'
  | 'selector'
  | 'key-path-string';

export interface SwiftPrimaryExpression {
  primaryType: SwiftPrimaryExpressionType,
}

export interface SwiftPrimaryExpressionIdentifier extends SwiftPrimaryExpression {
  primaryType: 'identifier',
  value: string,
}

export interface SwiftPrimaryExpressionLiteral extends SwiftPrimaryExpression {
  primaryType: 'literal',
  value: SwiftLiteralExpression,
}
