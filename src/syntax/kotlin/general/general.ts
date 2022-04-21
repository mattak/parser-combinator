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

export type KotlinDeclaration = KotlinDeclarationClassDeclaration
  | KotlinDeclarationObjectDeclaration
  | KotlinDeclarationFunctionDeclaration
  | KotlinDeclarationPropertyDeclaration
  | KotlinDeclarationTypeAliasDeclaration

export interface KotlinDeclarationClassDeclaration {
  type: 'class',
  value: KotlinClassDeclaration,
}

export interface KotlinDeclarationObjectDeclaration {
  type: 'object',
  value: KotlinObjectDeclaration,
}

export interface KotlinDeclarationFunctionDeclaration {
  type: 'function',
  value: KotlinFunctionDeclaration,
}

export interface KotlinDeclarationPropertyDeclaration {
  type: 'property',
  value: KotlinPropertyDeclaration,
}

export interface KotlinDeclarationTypeAliasDeclaration {
  type: 'typeAlias',
  value: KotlinTypeAliasDeclaration,
}

export interface KotlinTypeAliasDeclaration {
  from: string,
  to: string,
}
