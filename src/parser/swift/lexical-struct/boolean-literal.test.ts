import {booleanLiteral} from "./boolean-literal";

describe('booleanLiteral', () => {
  const parser = booleanLiteral;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'fail',
    });
  });

  test('a', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'fail',
    });
  });

  test('true', () => {
    const input = [...'true'] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'success',
      data: 'true',
      rest: [],
    });
  });

  test('false', () => {
    const input = [...'false'] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'success',
      data: 'false',
      rest: [],
    });
  });
})