import {KotlinDeclaration} from "./declaration";

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