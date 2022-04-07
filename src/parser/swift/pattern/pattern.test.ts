import {identifierPattern, pattern, wildcardPattern} from "./pattern";

describe('identifier-pattern', () => {
  const parser = identifierPattern;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'fail'
    });
  });

  test('Input a', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'success',
      data: {value: 'a', type: "identifier"},
      rest: [],
    });
  });

  test('Input `abc`d', () => {
    const input = [...'`abc`d'] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'success',
      data: {value: 'abc', type: "identifier"},
      rest: ['d'],
    });
  });
});

describe('wildcard-pattern', () => {
  const parser = wildcardPattern;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'fail'
    });
  });

  test('Input _', () => {
    const input = [...'_'] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'success',
      data: {value: '_', type: 'wildcard'},
      rest: [],
    });
  });
});

describe('pattern', () => {
  const parser = pattern;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'fail'
    });
  });

  test('Input wildcard', () => {
    const input = [...'_'] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'success',
      data: {value: '_', type: 'wildcard'},
      rest: [],
    });
  });

  test('Input identifier', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual({
      result: 'success',
      data: {value: 'a', type: 'identifier'},
      rest: [],
    });
  });

});
