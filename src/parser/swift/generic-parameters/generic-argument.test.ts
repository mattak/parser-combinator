import {genericArgumentClause} from "./generic-argument";
import {ParserOutput} from "../../../types";
import {SwiftType, SwiftTypeIdentifier} from "../../../syntax/swift";

describe('genericArgumentClause', () => {
  const parser = genericArgumentClause;

  test('EmptyInput', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftType[]>>({
      result: 'fail',
    });
  });

  test('Input <Hello>', () => {
    const input = [...'<Hello>'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftType[]>>({
      result: 'success',
      data: [
        <SwiftTypeIdentifier>{
          type: 'type-identifier',
          name: 'Hello',
          genericArguments: [],
          innerType: null,
        }
      ],
      rest: []
    });
  });

  test('Input <Hello, World>', () => {
    const input = [...'<Hello, World>'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftType[]>>({
      result: 'success',
      data: [
        <SwiftTypeIdentifier>{
          type: 'type-identifier',
          name: 'Hello',
          genericArguments: [],
          innerType: null,
        },
        <SwiftTypeIdentifier>{
          type: 'type-identifier',
          name: 'World',
          genericArguments: [],
          innerType: null,
        },
      ],
      rest: []
    });
  });

  test('Input <Hello ,World>', () => {
    const input = [...'<Hello ,World>'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftType[]>>({
      result: 'success',
      data: [
        <SwiftTypeIdentifier>{
          type: 'type-identifier',
          name: 'Hello',
          genericArguments: [],
          innerType: null,
        },
        <SwiftTypeIdentifier>{
          type: 'type-identifier',
          name: 'World',
          genericArguments: [],
          innerType: null,
        },
      ],
      rest: []
    });
  });
  test('Input <Hello , World>', () => {
    const input = [...'<Hello , World>'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftType[]>>({
      result: 'success',
      data: [
        <SwiftTypeIdentifier>{
          type: 'type-identifier',
          name: 'Hello',
          genericArguments: [],
          innerType: null,
        },
        <SwiftTypeIdentifier>{
          type: 'type-identifier',
          name: 'World',
          genericArguments: [],
          innerType: null,
        },
      ],
      rest: []
    });
  });
});
