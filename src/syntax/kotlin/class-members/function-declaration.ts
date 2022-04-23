import {KotlinExpression} from "../expressions/expressions";
import {KotlinSimpleIdentifier} from "../identifiers/simple-identifier";
import {KotlinType} from "../types/type";

export interface KotlinFunctionDeclaration {
  // modifiers?
  // 'fun'
  // typeParameters?
  // (receiverType '.')?
  name: KotlinSimpleIdentifier,
  parameters: KotlinFunctionValueParameters,
  // (':' type)?
  // typeConstraints?
  functionBody: KotlinFunctionBody | null,
}

export interface KotlinFunctionBody {
  // block | '=' expression
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