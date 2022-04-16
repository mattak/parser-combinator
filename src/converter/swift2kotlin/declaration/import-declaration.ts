import {SwiftImportDeclaration} from "../../../syntax/swift";
import {KotlinImportHeader} from "../../../syntax/kotlin";

export function importDeclarationConverter(input: SwiftImportDeclaration): KotlinImportHeader {
  return <KotlinImportHeader>{
    path: input.path,
  }
}
