import {structDeclarationConverter, structMemberConverter} from "./struct-declaration";
import {
  KotlinClassBody,
  KotlinClassMemberDeclarationDeclaration,
  KotlinDeclaration,
  KotlinModifiers,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {
  SwiftDeclaration,
  SwiftImportDeclaration,
  SwiftStructDeclaration,
  SwiftStructMember
} from "../../../syntax/swift";

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

describe('structMemberDeclaration', () => {
  const converter = structMemberConverter;
  beforeEach(() => {
    jest.mock('./declaration', () => ({
      ...(jest.requireActual('./declaration')),
      declarationConverter: jest.fn(() => <SwiftDeclaration>{})
    }))
  })

  test('empty', () => {
    const input = <SwiftStructMember>{};
    expect(() => {
      const output = converter(input);
    }).toThrow();
  });

  // test('declaration', () => {
  //   const input = <SwiftStructMember>{
  //     type: 'declaration',
  //     value: <SwiftImportDeclaration>{
  //       type: 'import',
  //       attributes: null,
  //       kind: null,
  //       path: 'Foundation',
  //     },
  //   };
  //   const output = converter(input);
  //   expect(output).toEqual<KotlinClassMemberDeclarationDeclaration>({
  //     type: 'declaration',
  //     value: <KotlinDeclaration>{},
  //   })
  // });
});
