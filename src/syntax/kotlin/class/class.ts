import {KotlinDeclaration} from "../general/general";
import {KotlinModifiers} from "../modifiers/modifiers";
import {KotlinClassMemberDeclaration} from "../class-members/class-members";

export interface KotlinClassDeclaration extends KotlinDeclaration {
  type: 'class',
}

export interface KotlinObjectDeclaration extends KotlinDeclaration {
  type: 'object',
  modifiers: KotlinModifiers,
  name: string,
  body: KotlinClassMemberDeclaration[],
}

export interface KotlinFunctionDeclaration extends KotlinDeclaration {
  type: 'function',
}

export interface KotlinPropertyDeclaration extends KotlinDeclaration {
  type: 'property',
}
