import {SwiftDeclaration, SwiftImportDeclaration, SwiftStructDeclaration} from "../../../syntax/swift";
import {KotlinDeclaration} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";

export function convert_declaration_declaration(table: SwiftKotlinConvertTable, input: SwiftDeclaration): KotlinDeclaration | null {
  switch (input.type) {
    case 'import':
      table['import-declaration'](table, <SwiftImportDeclaration>input);
      return null;
    // case 'constant':
    // case 'variable':
    // case 'typealias':
    // case 'function':
    // case 'enum':
    case 'struct':
      return table['struct-declaration'](table, <SwiftStructDeclaration>input);
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
      throw Error(`not handled input.type: ${input.type}`);
  }
}
