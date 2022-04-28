import {KotlinStringLiteral} from "./string-literal";
import {KotlinSimpleIdentifier} from "../identifiers/simple-identifier";
import {KotlinLiteralConstant} from "./literal-constant";

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
