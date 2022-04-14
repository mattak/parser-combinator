import {structDeclarationConverter} from "./struct-declaration";
import {KotlinClassBody, KotlinModifiers, KotlinObjectDeclaration} from "../../../syntax/kotlin";
import {SwiftStructDeclaration} from "../../../syntax/swift";

describe('structDeclaration', () => {
  const converter = structDeclarationConverter;

  test('empty body', () => {
    const input = <SwiftStructDeclaration>{
      type: 'struct',
      name: 'sample',
      accessLevelModifier: null,
      body: [],
    };
    const output = converter(input);
    expect(output).toEqual<KotlinObjectDeclaration>({
      type: 'object',
      modifiers: <KotlinModifiers>{modifiers: []},
      name: 'sample',
      body: <KotlinClassBody>{members: []},
    });
  });
});