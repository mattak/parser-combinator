import {ParserOutput} from "../../../types";
import {nilLiteral} from "./nil-literal";

describe('nilLiteral', () => {
  const parser = nilLiteral;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'nil'>>({
      result: 'fail',
    });
  });

  test('a', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'fail',
    });
  });

  test('nil', () => {
    const input = [...'nil'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'nil'>>({
      result: 'success',
      data: 'nil',
      rest: [],
    });
  });
});
