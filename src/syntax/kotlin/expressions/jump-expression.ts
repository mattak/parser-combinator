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
  // return or return@<identifier>
  type: 'return',
  label: string | null, // <identifier>
  expression: KotlinExpression | null,
}

export interface KotlinJumpExpressionContinue {
  // continue or continue@<identifier>
  type: 'continue',
  label: string | null, // <identifier>
}

export interface KotlinJumpExpressionBreak {
  // break or break@<identifier>
  type: 'break',
  label: string | null, // <identifier>
}
