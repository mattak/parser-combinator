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

export interface SwiftPostfixExpression {
  type: SwiftPostfixExpressionType,
}

export interface SwiftPostfixExpressionPrimary extends SwiftPostfixExpression {
  value: SwiftPrimaryExpression,
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
  type: SwiftPrimaryExpressionType,
}

export interface SwiftPrimaryExpressionIdentifier extends SwiftPrimaryExpression {
  type: 'identifier',
  value: string,
}

export interface SwiftPrimaryExpressionLiteral extends SwiftPrimaryExpression {
  type: 'literal',
  value: SwiftLiteralExpression,
}