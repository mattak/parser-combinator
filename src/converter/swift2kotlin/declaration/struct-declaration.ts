import {SwiftStructDeclaration, SwiftStructMember, SwiftStructMemberDeclaration} from "../../../syntax/swift";
import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinModifiers,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {declarationConverter} from "./declaration";

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
