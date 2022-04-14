import {KotlinDeclaration} from "../general/general";
import {KotlinType} from "../types/type";

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

export interface KotlinFunctionDeclaration extends KotlinDeclaration {
  type: 'function',
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

export interface KotlinFunctionValueParameter extends KotlinDeclaration {
  // modifier:
  parameter: KotlinParameter,
  // expression:
}

export interface KotlinParameter {
  key: string,
  value: KotlinType,
}