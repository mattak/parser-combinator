import {KotlinExpression} from "./expressions";

export type KotlinJumpExpression = KotlinJumpExpressionThrow
  | KotlinJumpExpressionReturn
  | KotlinJumpExpressionContinue
  | KotlinJumpExpressionBreak

export interface KotlinJumpExpressionThrow {
  type: 'throw',
  expression: KotlinExpression,
}

export interface KotlinJumpExpressionReturn {
  type: 'return',
  label: 'return' | string, // return@<identifier>
  expression: KotlinExpression | null,
}

export interface KotlinJumpExpressionContinue {
  type: 'continue',
  label: 'continue' | string, // continue@<identifier>
}

export interface KotlinJumpExpressionBreak {
  type: 'break',
  label: 'break' | string, // break@<identifier>
}
