import {
  SwiftDeclaration,
  SwiftStructDeclaration,
  SwiftStructMember,
  SwiftStructMemberDeclaration
} from "../../../syntax/swift";
import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinDeclaration,
  KotlinModifiers,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";

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
  const members: KotlinClassMemberDeclaration[] = input.body.map(structMemberConverter);

  return <KotlinObjectDeclaration>{
    type: 'object',
    modifiers: <KotlinModifiers>{modifiers: []},
    name: input.name,
    body: <KotlinClassBody>{
      members: members,
    },
  };
}

export function structMemberConverter(input: SwiftStructMember): KotlinClassMemberDeclaration {
  switch (input.type) {
    case "declaration":
      const v = <SwiftStructMemberDeclaration>input;
      const decl = declarationConverter(v.value);
      return <KotlinClassMemberDeclaration>{
        type: 'declaration',
        value: decl,
      }
    // case "compiler-control-statement":
    default:
      throw Error(`not handled input.type: ${input.type}`);
  }
}
