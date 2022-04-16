import {convert_structDeclaration_objectDeclaration, convert_structMember_classMember} from "./struct-declaration";
import {
  KotlinClassBody, KotlinClassMemberDeclaration,
  KotlinClassMemberDeclarationDeclaration,
  KotlinDeclaration,
  KotlinModifiers,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {
  SwiftDeclaration,
  SwiftImportDeclaration,
  SwiftStructDeclaration,
  SwiftStructMember, SwiftStructMemberDeclaration
} from "../../../syntax/swift";
import {SwiftKotlinConvertTable, swiftKotlinDefaultConvertTable} from "../swift-converter";

describe('convert_structDeclaration_objectDeclaration', () => {
  const converter = convert_structDeclaration_objectDeclaration;
  const table = <SwiftKotlinConvertTable>{
    ...swiftKotlinDefaultConvertTable,
    'struct-member': jest.fn().mockImplementation(x => <KotlinClassMemberDeclaration>{})
  }

  test('empty', () => {
    const input = <SwiftStructDeclaration>{
      type: 'struct',
      name: 'sample',
      accessLevelModifier: null,
      body: [],
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinObjectDeclaration>({
      type: 'object',
      modifiers: <KotlinModifiers>{modifiers: []},
      name: 'sample',
      body: <KotlinClassBody>{members: []},
    });
  });

  test('member', () => {
    const input = <SwiftStructDeclaration>{
      type: 'struct',
      name: 'sample',
      accessLevelModifier: null,
      body: [<SwiftStructMember>{
        type: 'declaration',
        value: <SwiftDeclaration>{},
      }],
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinObjectDeclaration>({
      type: 'object',
      modifiers: <KotlinModifiers>{modifiers: []},
      name: 'sample',
      body: <KotlinClassBody>{
        members: [
          <KotlinClassMemberDeclaration>{}
        ]
      },
    });
  });
});

describe('convert_structMember_classMember', () => {
  const converter = convert_structMember_classMember;
  const table = <SwiftKotlinConvertTable>{
    ...swiftKotlinDefaultConvertTable,
    'declaration': jest.fn().mockImplementation(x => <KotlinDeclaration>{})
  }

  test('declaration', () => {
    const input = <SwiftStructMemberDeclaration>{
      type: 'declaration',
      value: <SwiftDeclaration>{},
    };
    const output = converter(table, input);
    expect(output).toEqual({
      type: 'declaration',
      value: <KotlinDeclaration>{}
    });
  });
});
