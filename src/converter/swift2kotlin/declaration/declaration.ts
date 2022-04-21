import {
  SwiftConstantDeclaration,
  SwiftDeclaration,
  SwiftImportDeclaration,
  SwiftStructDeclaration
} from "../../../syntax/swift";
import {
  KotlinDeclaration, KotlinDeclarationClassDeclaration,
  KotlinDeclarationPropertyDeclaration,
  KotlinImportHeader,
  KotlinPropertyDeclaration
} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";

export function convert_declaration_importHeader(table: SwiftKotlinConvertTable, input: SwiftDeclaration): KotlinImportHeader | null {
  switch (input.type) {
    case 'import':
      return table['import-declaration'](table, <SwiftImportDeclaration>input);
    default:
      return null
  }
}

export function convert_declaration_declarations(table: SwiftKotlinConvertTable, input: SwiftDeclaration): KotlinDeclaration[] {
  switch (input.type) {
    case 'import':
      return [];
    case 'constant':
      // KotlinPropertyDeclaration[]
      const properties = table['constant-declaration'](table, <SwiftConstantDeclaration>input);
      return properties.map(x => {
        return <KotlinDeclarationPropertyDeclaration>{
          type: 'property',
          value: x
        }
      });
    // case 'variable':
    // case 'typealias':
    // case 'function':
    // case 'enum':
    case 'struct':
      return [
        table['struct-declaration'](table, <SwiftStructDeclaration>input),
      ];
    // case 'class':
    // case 'actor':
    // case 'protocol':
    // case 'initializer':
    // case 'deinitializer':
    // case 'extension':
    // case 'subscript':
    // case 'operator':
    // case 'precedence-group':
    //   break;
    default:
      throw Error(`not handled input: ${input}`);
  }
}
