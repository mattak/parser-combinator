import {
  KotlinClassMemberDeclaration,
  KotlinDeclaration,
  KotlinFile,
  KotlinModifiers,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {
  SwiftDeclaration,
  SwiftStatement,
  SwiftStatementDeclaration, SwiftStructDeclaration,
  SwiftTopLevelDeclaration
} from "../../../syntax/swift";

export function fileConverter(input: SwiftTopLevelDeclaration, supplement: KotlinFile | null): KotlinFile {
  return <KotlinFile>{
    packageHeader: supplement?.packageHeader || '',
    importList: [
      ...(supplement?.importList ?? [])
    ],
    topLevelObjects: input.statements.map(topLevelObjectsConverter),
  }
}

export function topLevelObjectsConverter(input: SwiftStatement): KotlinDeclaration {
  switch (input.type) {
    case "declaration":
      return declarationConverter((<SwiftStatementDeclaration>input).value);
    // case 'loop-statement':
    //   break;
    // case 'branch-statement':
    //   break;
    // case 'labeled-statement':
    //   break;
    // case 'control-transfer-statement':
    //   break;
    // case 'defer-statement':
    //   break;
    // case 'do-statement':
    //   break;
    // case 'compiler-control-statement':
    //   break;
    default:
      throw Error(`not handled input.type: ${input.type}`);
  }
}

export function declarationConverter(input: SwiftDeclaration): KotlinDeclaration {
  switch (input.type) {
    // case 'import':
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

export function structDeclarationConverter(input: SwiftStructDeclaration): KotlinObjectDeclaration {
  return <KotlinObjectDeclaration>{
    type: 'object',
    modifiers: <KotlinModifiers>{modifiers: []},
    name: input.name,
    body: <KotlinClassMemberDeclaration[]>[],
  };
}
