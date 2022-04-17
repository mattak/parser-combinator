import {SwiftStructDeclaration, SwiftStructMember, SwiftStructMemberDeclaration} from "../../../syntax/swift";
import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinModifiers,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";

export function convert_structDeclaration_objectDeclaration(table: SwiftKotlinConvertTable, input: SwiftStructDeclaration): KotlinObjectDeclaration {
  const members: KotlinClassMemberDeclaration[] = input.body.map(x => table['struct-member'](table, x));

  return <KotlinObjectDeclaration>{
    modifiers: <KotlinModifiers>{modifiers: []},
    name: input.name,
    body: <KotlinClassBody>{
      members: members,
    },
  };
}

export function convert_structMember_classMember(table: SwiftKotlinConvertTable, input: SwiftStructMember): KotlinClassMemberDeclaration {
  switch (input.type) {
    case "declaration":
      const v = <SwiftStructMemberDeclaration>input;
      const decl = table['declaration'](table, v.value);
      return <KotlinClassMemberDeclaration>{
        type: 'declaration',
        value: decl,
      }
    // case "compiler-control-statement":
    default:
      throw Error(`not handled input.type: ${input.type}`);
  }
}
