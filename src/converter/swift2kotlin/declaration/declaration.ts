import {SwiftDeclaration, SwiftStructDeclaration} from "../../../syntax/swift";
import {KotlinDeclaration} from "../../../syntax/kotlin";
import {structDeclarationConverter} from "./struct-declaration";

export function declarationConverter(input: SwiftDeclaration): KotlinDeclaration {
  switch (input.type) {
    // case 'import':
    //   return importDeclarationConverter(<SwiftImportDeclaration>input);
    // case 'constant':
    // case 'variable':
    // case 'typealias':
    // case 'function':
    // case 'enum':
    case 'struct':
      return structDeclarationConverter(<SwiftStructDeclaration>input);
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
