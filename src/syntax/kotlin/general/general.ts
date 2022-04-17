import {KotlinClassDeclaration, KotlinObjectDeclaration} from "../class/class";
import {KotlinFunctionDeclaration, KotlinPropertyDeclaration} from "../class-members/class-members";

export interface KotlinFile {
  packageHeader: string,
  importList: KotlinImportList,
  topLevelObjects: KotlinDeclaration[], // topLevelObject -> declaration
}

export interface KotlinImportList {
  importHeaders: KotlinImportHeader[],
}

export interface KotlinImportHeader {
  path: string,
}

export type KotlinDeclarationType = 'class' | 'object' | 'function' | 'property' | 'typeAlias';

export interface KotlinDeclaration {
  type: KotlinDeclarationType,
}

export interface KotlinDeclarationClassDeclaration extends KotlinDeclaration {
  type: 'class',
  value: KotlinClassDeclaration,
}

export interface KotlinDeclarationObjectDeclaration extends KotlinDeclaration {
  type: 'object',
  value: KotlinObjectDeclaration,
}

export interface KotlinDeclarationFunctionDeclaration extends KotlinDeclaration {
  type: 'function',
  value: KotlinFunctionDeclaration,
}

export interface KotlinDeclarationPropertyDeclaration extends KotlinDeclaration {
  type: 'property',
  value: KotlinPropertyDeclaration,
}

export interface KotlinDeclarationTypeAliasDeclaration extends KotlinDeclaration {
  type: 'typeAlias',
  value: KotlinTypeAliasDeclaration,
}

export interface KotlinTypeAliasDeclaration {
  from: string,
  to: string,
}
