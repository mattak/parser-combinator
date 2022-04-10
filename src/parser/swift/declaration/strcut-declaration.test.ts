import {ParserOutput} from "../../../types";
import {structDeclaration, structBody} from "./struct-declaration";
import {SwiftStructDeclaration, SwiftStructMember} from "../../../syntax/swift";

describe('structBody', () => {
  const parser = structBody;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructMember[]>>({
      result: 'fail'
    });
  });

  test('Input: {}', () => {
    const input = [...'{}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructMember[]>>({
      result: 'success',
      data: [],
      rest: [],
    });
  });
  //
  // test('Input: { let a = 1 }', () => {
  //   const input = [...'{ let a = 1 }'] as const;
  //   const output = parser(input);
  //   expect(output).toEqual<ParserOutput<SwiftStructMember[]>>({
  //     result: 'success',
  //     data: [
  //       <SwiftStructMemberDeclaration>{
  //         structMemberType: 'declaration',
  //         type: 'constant',
  //         patternInitializers: [
  //           <SwiftPatternInitializer>{
  //             pattern: "a",
  //             initializer: <SwiftExpression>{
  //
  //             },
  //           },
  //         ]
  //       }
  //     ],
  //     rest: [],
  //   });
  // });
});

describe('struct', () => {
  const parser = structDeclaration;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructDeclaration>>({
      result: 'fail'
    });
  });

  test('Input: structDeclaration MyStruct {}', () => {
    const input = [...'structDeclaration MyStruct {}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructDeclaration>>({
      result: 'success',
      data: <SwiftStructDeclaration>{
        type: 'struct',
        name: 'MyStruct',
        accessLevelModifier: null,
        body: [],
      },
      rest: [],
    });
  });
});