import {KotlinDeclaration} from "../general/declaration";
import {KotlinExpression} from "../expressions/expressions";

export type KotlinStatements = KotlinStatement[]

export interface KotlinStatement {
  // (label | annotation)*
  // (declaration | assignment | loopStatement | expression)
  value: KotlinStatementDeclaration | KotlinStatementExpression,
}

export interface KotlinStatementDeclaration {
  type: 'declaration',
  value: KotlinDeclaration,
}

export interface KotlinStatementExpression {
  type: 'expression',
  value: KotlinExpression,
}
