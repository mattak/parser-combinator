import {KotlinDeclaration} from "../general/general";
import {KotlinType} from "../types/type";
import {KotlinExpression} from "../expressions/expressions";

export type KotlinClassMemberDeclarationType = 'declaration'
  | 'companionObject'
  | 'anonymousInitializer'
  | 'secondaryConstructor'
  ;

export interface KotlinClassMemberDeclaration {
  type: KotlinClassMemberDeclarationType,
}

export interface KotlinClassMemberDeclarationDeclaration extends KotlinClassMemberDeclaration {
  type: 'declaration',
  value: KotlinDeclaration,
}

export interface KotlinFunctionDeclaration {
  // modifiers:
  // fun
  // typeParameters?
  // receiveType?
  name: string,
  parameters: KotlinFunctionValueParameter[],
  // returnType?
  // typeConstraints
  // body:
}

export interface KotlinFunctionValueParameter {
  // modifier:
  parameter: KotlinParameter,
  // expression:
}

export interface KotlinParameter {
  key: string,
  value: KotlinType,
}

export interface KotlinPropertyDeclaration {
  // modifiers?
  type: 'val' | 'var',
  // typeParameters?
  // (receiverType '.')?
  // (multiVariableDeclaration | variableDeclaration)
  variableDeclaration: KotlinVariableDeclaration,
  // typeConstraints?
  // (('=' expression) | propertyDelegate)? ';'?
  expression: KotlinExpression | null,
  // ((getter? (semi? setter)?) | (setter? (semi? getter)?))
}

export interface KotlinVariableDeclaration {
  // annotation*
  // simpleIdentifier (':' type)?
  name: string,
  // type: KotlinType?
  // ;
}