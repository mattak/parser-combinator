import {SwiftStructDeclaration, SwiftStructMember, SwiftStructMemberDeclaration} from "../../../syntax/swift";
import {
  KotlinClassBody,
  KotlinClassMemberDeclaration, KotlinDeclaration, KotlinDeclarationObjectDeclaration,
  KotlinModifiers,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";

export function convert_structDeclaration_objectDeclaration(table: SwiftKotlinConvertTable, input: SwiftStructDeclaration): KotlinDeclaration {
  const members: KotlinClassMemberDeclaration[] = input.body.flatMap(x => table['struct-member'](table, x));

  return <KotlinDeclarationObjectDeclaration>{
    type: 'object',
    value: <KotlinObjectDeclaration>{
      modifiers: <KotlinModifiers>{modifiers: []},
      name: input.name,
      body: <KotlinClassBody>{
        members: members,
      },
    }
  };
}

export function convert_structMember_classMemberDeclarations(table: SwiftKotlinConvertTable, input: SwiftStructMember): KotlinClassMemberDeclaration[] {
  switch (input.type) {
    case "declaration":
      const v = <SwiftStructMemberDeclaration>input;
      const declarations = table['declaration'](table, v.value);
      return declarations.map(x => <KotlinClassMemberDeclaration>{
        type: 'declaration',
        value: x,
      });
    // case "compiler-control-statement":
    default:
      throw Error(`not handled input.type: ${input.type}`);
  }
}
