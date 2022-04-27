import {
  SwiftConstantDeclaration,
  SwiftDeclaration, SwiftFunctionDeclaration,
  SwiftImportDeclaration,
  SwiftStructDeclaration
} from "../../../syntax/swift";
import {
  KotlinDeclaration,
  KotlinDeclarationFunctionDeclaration,
  KotlinDeclarationPropertyDeclaration, KotlinFunctionDeclaration,
  KotlinImportHeader
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
      const properties = table['constant-declaration'](table, <SwiftConstantDeclaration>input);
      return properties.map(x => {
        return <KotlinDeclarationPropertyDeclaration>{
          type: 'property',
          value: x
        }
      });
    // case 'variable':
    // case 'typealias':
    case 'function':
      return <KotlinDeclaration[]>[
        <KotlinDeclarationFunctionDeclaration>{
          type: 'function',
          value: table['function-declaration'](table, <SwiftFunctionDeclaration>input),
        },
      ];
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
