import {KotlinStringLiteral} from "./string-literal";
import {KotlinSimpleIdentifier} from "../identifiers/simple-identifier";
import {KotlinLiteralConstant} from "./literal-constant";
import {KotlinJumpExpression} from "./jump-expression";

export type KotlinPrimaryExpressionType = 'parenthesizedExpression'
  | 'simpleIdentifier'
  | 'literalConstant'
  | 'stringLiteral'
  | 'callableReference'
  | 'functionLiteral'
  | 'objectLiteral'
  | 'collectionLiteral'
  | 'thisExpression'
  | 'superExpression'
  | 'ifExpression'
  | 'whenExpression'
  | 'tryExpression'
  | 'jumpExpression'
  ;

export type KotlinPrimaryExpression = KotlinPrimaryExpressionLiteralConstant
  | KotlinPrimaryExpressionStringLiteral
  | KotlinPrimaryExpressionSimpleIdentifier
  | KotlinPrimaryExpressionJumpExpression
  ;

export interface KotlinPrimaryExpressionLiteralConstant {
  type: 'literalConstant',
  value: KotlinLiteralConstant,
}

export interface KotlinPrimaryExpressionStringLiteral {
  type: 'stringLiteral',
  value: KotlinStringLiteral,
}

export interface KotlinPrimaryExpressionSimpleIdentifier {
  type: 'simpleIdentifier',
  value: KotlinSimpleIdentifier,
}

export interface KotlinPrimaryExpressionJumpExpression {
  type: 'jumpExpression',
  value: KotlinJumpExpression,
}
