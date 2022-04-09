import {map, str, opt, diff, list, nextMatch, listWithTailDelimiter} from './util';
import type {Option} from './util';
import {char, digit, Digit} from './char';
import type {ParserInput, ParserOutput} from "./types";

describe('map(digit, s => Number.parseInt(s,10))', () => {
  const parser = map(digit, s => Number.parseInt(s, 10));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('input "5"', () => {
    const input = [...'5'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 5,
      rest: [],
    });
  });
});

describe('str("true")', () => {
  const parser = str('true');

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'true'>>({
      result: 'fail',
    });
  });

  test('input "true"', () => {
    const input = [...'true'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'true'>>({
      result: 'success',
      data: "true",
      rest: [],
    });
  });
});

describe('opt()', () => {
  describe('opt(char("a"))', () => {
    const parser = opt(char('a'));

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<Option<'a'>>>({
        result: 'success',
        data: {status: 'none'},
        rest: [],
      });
    });

    test('input "a"', () => {
      const input = [...'a'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<Option<'a'>>>({
        result: 'success',
        data: {status: 'some', value: 'a'},
        rest: [],
      });
    });

    test('input "aa"', () => {
      const input = [...'aa'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<Option<'a'>>>({
        result: 'success',
        data: {status: 'some', value: 'a'},
        rest: ['a'],
      });
    });

    test('input "b"', () => {
      const input = [...'b'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<Option<'a'>>>({
        result: 'success',
        data: {status: 'none'},
        rest: ['b'],
      });
    });
  });
});

describe('diff(digit, char("0"))', () => {
  const parser = diff(digit, char('0'));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'fail',
    });
  });

  test('input "a"', () => {
    const input = [..."a"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'fail',
    });
  });

  test('input "0"', () => {
    const input = [..."0"] as const;
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
});

describe('list(digit, char(","))', () => {
  const parser = list(digit, char(','));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'fail',
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'fail',
    });
  });

  test('input "1"', () => {
    const input = [...'1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'success',
      data: ['1'],
      rest: [],
    });
  });

  test('input "1,2,3,4,5"', () => {
    const input = [...'1,2,3,4,5'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'success',
      data: ['1', '2', '3', '4', '5'],
      rest: [],
    });
  });
});

describe('listWithTailDelimiter(digit, char(","))', () => {
  const parser = listWithTailDelimiter(digit, char(","));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'fail',
    });
  });

  test('Input: 1,2,3', () => {
    const input = [...'1,2,3'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'success',
      data: ['1', '2', '3'],
      rest: [],
    });
  });

  test('Input: 1,', () => {
    const input = [...'1,'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'success',
      data: ['1'],
      rest: [],
    });
  });
});

describe('nextMatch(digit)', () => {
  const parser = nextMatch(digit);

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<[ParserInput, Digit]>>({
      result: 'fail',
    });
  });

  test('Input a', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<[ParserInput, Digit]>>({
      result: 'fail',
    });
  });

  test('Input 1', () => {
    const input = [...'1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<[ParserInput, Digit]>>({
      result: 'success',
      data: [[], '1'],
      rest: [],
    });
  });

  test('Input a1b2', () => {
    const input = [...'a1b2'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<[ParserInput, Digit]>>({
      result: 'success',
      data: [['a'], '1'],
      rest: ['b', '2'],
    });
  });
});
