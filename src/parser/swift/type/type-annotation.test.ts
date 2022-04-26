import {ParserOutput} from "../../../types";
import {SwiftType, SwiftTypeAnnotation, SwiftTypeIdentifier} from "../../../syntax/swift";
import {typeAnnotation} from "./type-annotation";

describe('typeAnnotation', () => {
  const parser = typeAnnotation;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeAnnotation>>({
      result: 'fail',
    });
  });

  test('Input: Sample', () => {
    const input = [...': Sample'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeAnnotation>>({
      result: 'success',
      data: <SwiftTypeAnnotation>{
        attributes: null,
        isInout: false,
        type: <SwiftType>{
          type: 'type-identifier',
          name: "Sample",
          genericArguments: [],
          innerType: null,
        },
      },
      rest: [],
    });
  });

  test('Input: ": inout Sample"', () => {
    const input = [...': inout Sample'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeAnnotation>>({
      result: 'success',
      data: <SwiftTypeAnnotation>{
        attributes: null,
        isInout: true,
        type: <SwiftType>{
          type: 'type-identifier',
          name: "Sample",
          genericArguments: [],
          innerType: null,
        },
      },
      rest: [],
    });
  });
});
