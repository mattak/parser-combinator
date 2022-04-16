import {SwiftImportDeclaration} from "../../../syntax/swift";
import {KotlinImportHeader, KotlinImportList} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";

export function convert_importDeclaration_importHeader(table: SwiftKotlinConvertTable, input: SwiftImportDeclaration): KotlinImportHeader {
  return <KotlinImportHeader>{
    path: input.path,
  }
}

export function convert_importDeclarations_importList(table: SwiftKotlinConvertTable, input: SwiftImportDeclaration[]): KotlinImportList {
  return <KotlinImportList>{
    importHeaders: input.map(x => table['import-declaration'](table, x)).filter(x => x !== null)
  };
}