import {char, is, upperAlpha, lowerAlpha, alpha, digit} from './char';
import type {UpperAlphabet, LowerAlphabet, Alphabet, Digit} from './char';
import type {ParserOutput} from "./types";

describe('char("a")', () => {
  const parser = char('a');

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'fail',
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'success',
      data: 'a',
      rest: [],
    });
  });

  test('input "abc"', () => {
    const input = [...'abc'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'success',
      data: 'a',
      rest: ['b', 'c'],
    });
  });

  test('input "A"', () => {
    const input = [...'A'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'fail',
    });
  });

  test('input "hoge"', () => {
    const input = [...'hoge'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'fail',
    });
  });
});

describe('is()', () => {
  describe('is(c => c === "a")', () => {
    const parser = is((c): c is 'a' => c === 'a');

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'>>({
        result: 'fail',
      });
    });

    test('input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'>>({
        result: 'success',
        data: 'a',
        rest: [],
      });
    });

    test('input "A"', () => {
      const input = [...'A'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'>>({
        result: 'fail',
      });
    });
  });

  describe('is(c => c === "0" || c === "1")', () => {
    const parser = is((c): c is '0' | '1' => c === '0' || c === '1');

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'0' | '1'>>({
        result: 'fail',
      });
    });

    test('Input "0"', () => {
      const input = [...'0'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'0' | '1'>>({
        result: 'success',
        data: '0',
        rest: [],
      });
    });

    test('Input "1"', () => {
      const input = [...'1'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'0' | '1'>>({
        result: 'success',
        data: '1',
        rest: [],
      });
    });

    test('Input "A"', () => {
      const input = [...'A'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'0' | '1'>>({
        result: 'fail',
      });
    });
  });
});

describe('upperAlpha', () => {
  const parser = upperAlpha;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<UpperAlphabet>>({
      result: 'fail',
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<UpperAlphabet>>({
      result: 'fail',
    });
  });

  test('input "A"', () => {
    const input = [...'A'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<UpperAlphabet>>({
      result: 'success',
      data: 'A',
      rest: [],
    });
  });
});

describe('lowerAlpha', () => {
  const parser = lowerAlpha;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LowerAlphabet>>({
      result: 'fail',
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LowerAlphabet>>({
      result: 'success',
      data: 'a',
      rest: [],
    });
  });

  test('input "A"', () => {
    const input = [...'A'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LowerAlphabet>>({
      result: 'fail',
    });
  });
});

describe('alpha', () => {
  const parser = alpha;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: 'fail',
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: 'success',
      data: 'a',
      rest: [],
    });
  });

  test('input "A"', () => {
    const input = [...'A'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: 'success',
      data: 'A',
      rest: [],
    });
  });

  test('input "1"', () => {
    const input = [...'1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: 'fail',
    });
  });
});

describe('digit', () => {
  const parser = digit;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'fail',
    });
  });

  test('input "5"', () => {
    const input = [..."5"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'success',
      data: '5',
      rest: [],
    });
  });
  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'fail',
    });
  });
});
