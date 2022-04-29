import {KotlinExpression} from "../expressions/expressions";
import {KotlinSimpleIdentifier} from "../identifiers/simple-identifier";
import {KotlinType} from "../types/type";
import {KotlinBlock} from "../statements/block";
import {KotlinModifiers} from "../modifiers/modifiers";

export interface KotlinFunctionDeclaration {
  // modifiers?
  modifiers: KotlinModifiers,
  // 'fun'
  // typeParameters?
  // (receiverType '.')?
  name: KotlinSimpleIdentifier,
  parameters: KotlinFunctionValueParameters,
  returnType: KotlinType | null, // (':' type)?
  // typeConstraints?
  body: KotlinFunctionBody | null,
}

export type KotlinFunctionBody = KotlinFunctionBodyBlock | KotlinFunctionBodyExpression

export interface KotlinFunctionBodyBlock {
  type: 'block',
  value: KotlinBlock,
}

export interface KotlinFunctionBodyExpression {
  type: 'expression',
  value: KotlinExpression,
}

// '(' (functionValueParameter (',' functionValueParameter)* ','?)? ')'
export type KotlinFunctionValueParameters = KotlinFunctionValueParameter[]

export interface KotlinFunctionValueParameter {
  // parameterModifiers? parameter ('=' expression)?
  parameter: KotlinParameter,
  expression: KotlinExpression | null,
}

export interface KotlinParameter {
  // simpleIdentifier ':' type
  key: KotlinSimpleIdentifier,
  type: KotlinType,
}