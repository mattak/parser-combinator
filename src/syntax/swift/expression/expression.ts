import {SwiftLiteral} from "../lexical-struct/literal";

export interface SwiftExpression {
  // try?
  // await?
  prefix: SwiftPrefixExpression,
  // infix?
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

export type SwiftPostfixExpression = SwiftPostfixExpressionPrimary

export interface SwiftPostfixExpressionPrimary {
  type: 'primary',
  value: SwiftPrimaryExpression,
}

export type SwiftLiteralExpressionType = 'literal' | 'array' | 'dictionary' | 'playground';

export type SwiftLiteralExpression = SwiftLiteralExpressionLiteral | SwiftLiteralExpressionArray

export interface SwiftLiteralExpressionLiteral {
  type: 'literal',
  value: SwiftLiteral,
}

export interface SwiftLiteralExpressionArray {
  type: 'array',
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

export type SwiftPrimaryExpression = SwiftPrimaryExpressionIdentifier | SwiftPrimaryExpressionLiteral

export interface SwiftPrimaryExpressionIdentifier {
  type: 'identifier',
  value: string,
}

export interface SwiftPrimaryExpressionLiteral {
  type: 'literal',
  value: SwiftLiteralExpression,
}