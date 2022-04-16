export interface KotlinFile {
  packageHeader: string,
  importList: string[],
  topLevelObjects: KotlinDeclaration[], // topLevelObject -> declaration
}

export type KotlinDeclarationType = 'class' | 'object' | 'function' | 'property' | 'typeAlias';

export interface KotlinDeclaration {
  type: KotlinDeclarationType,
}

export interface KotlinTypeAliasDeclaration extends KotlinDeclaration {
  type: 'typeAlias',
  from: string,
  to: string,
}

export interface KotlinImportList {
  importHeaders: KotlinImportHeader[],
}

export interface KotlinImportHeader {
  path: string,
}