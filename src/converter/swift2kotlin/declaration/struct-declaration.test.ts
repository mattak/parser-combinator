import {
  convert_structDeclaration_objectDeclaration,
  convert_structMember_classMemberDeclarations
} from "./struct-declaration";
import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinDeclaration,
  KotlinDeclarationObjectDeclaration,
  KotlinModifiers
} from "../../../syntax/kotlin";
import {
  SwiftDeclaration,
  SwiftStructDeclaration,
  SwiftStructMember,
  SwiftStructMemberDeclaration
} from "../../../syntax/swift";
import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";

describe('convert_structDeclaration_objectDeclaration', () => {
  const converter = convert_structDeclaration_objectDeclaration;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'struct-member': jest.fn().mockImplementation(x => [<KotlinClassMemberDeclaration>{}])
  }

  test('empty', () => {
    const input = <SwiftStructDeclaration>{
      type: 'struct',
      name: 'sample',
      accessLevelModifier: null,
      body: [],
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinDeclarationObjectDeclaration>(
      <KotlinDeclarationObjectDeclaration>{
        type: 'object',
        value: {
          modifiers: <KotlinModifiers>[],
          name: 'sample',
          body: <KotlinClassBody>{members: []},
        },
      }
    );
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
    expect(output).toEqual<KotlinDeclarationObjectDeclaration>(
      <KotlinDeclarationObjectDeclaration>{
        type: 'object',
        value: {
          modifiers: [],
          name: 'sample',
          body: <KotlinClassBody>{
            members: [
              <KotlinClassMemberDeclaration>{}
            ]
          },
        }
      }
    );
  });
});

describe('convert_structMember_classMemberDeclarations', () => {
  const converter = convert_structMember_classMemberDeclarations;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'declaration': jest.fn().mockImplementation(x => [<KotlinDeclaration>{}])
  }

  test('declaration', () => {
    const input = <SwiftStructMemberDeclaration>{
      type: 'declaration',
      value: <SwiftDeclaration>{},
    };
    const output = converter(table, input);
    expect(output).toEqual([<KotlinClassMemberDeclaration>{
      type: 'declaration',
      value: <KotlinDeclaration>{}
    }]);
  });
});
