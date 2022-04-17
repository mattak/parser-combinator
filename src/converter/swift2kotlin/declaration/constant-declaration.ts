import {SwiftKotlinConvertTable} from "../swift-converter";
import {KotlinDeclaration} from "../../../syntax/kotlin";
import {SwiftConstantDeclaration} from "../../../syntax/swift";


export function convert_constantDeclaration_declaration(table: SwiftKotlinConvertTable, input: SwiftConstantDeclaration): KotlinDeclaration {
  throw Error("TODO: implement constant declaration")
  // const members: KotlinClassMemberDeclaration[] = input.body.map(x => table['struct-member'](table, x));
  //
  //
  // return <KotlinDeclaration>{
  //   type: 'object',
  //   modifiers: <KotlinModifiers>{modifiers: []},
  //   name: input.name,
  //   body: <KotlinClassBody>{
  //     members: members,
  //   },
  // };
}

