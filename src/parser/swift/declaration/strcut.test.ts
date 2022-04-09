import {ParserOutput} from "../../../types";
import {struct, structBody, SwiftStruct, SwiftStructMember} from "./struct";

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
  const parser = struct;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStruct>>({
      result: 'fail'
    });
  });

  test('Input: struct MyStruct {}', () => {
    const input = [...'struct MyStruct {}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStruct>>({
      result: 'success',
      data: <SwiftStruct>{
        name: 'MyStruct',
        accessLevelModifier: null,
        body: [],
      },
      rest: [],
    });
  });
});