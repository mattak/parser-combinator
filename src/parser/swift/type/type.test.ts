import {SwiftType, type} from "./type";
import {SwiftTypeIdentifierType} from "./type-identifier";
import {ParserOutput} from "../../../types";

describe('type', ()=> {
  const parser = type;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftType>>({
      result: 'fail',
    });
  });

  test('Input a', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftType>>({
      result: 'success',
      data: <SwiftTypeIdentifierType>{
        type: 'type-identifier',
        name: 'a',
        genericArguments: [],
        innerType: null,
      },
      rest: [],
    });
  });
});
