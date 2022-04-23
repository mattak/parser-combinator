import {KotlinDeclaration} from "../general/general";
import {KotlinExpression} from "../expressions/expressions";

export type KotlinClassMemberDeclarationType = 'declaration'
  | 'companionObject'
  | 'anonymousInitializer'
  | 'secondaryConstructor'
  ;

export type KotlinClassMemberDeclaration = KotlinClassMemberDeclarationDeclaration

export interface KotlinClassMemberDeclarationDeclaration {
  type: 'declaration',
  value: KotlinDeclaration,
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