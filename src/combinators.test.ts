import {not, or, cat, rep} from './combinators';
import {char} from './char';
import type {ParserOutput} from './types';

describe('not(char("a"))', () => {
  const parser = not(char('a'));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'success',
      data: null,
      rest: [],
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'fail',
    });
  });

  test('input "A"', () => {
    const input = [...'A'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'success',
      data: null,
      rest: [...'A'],
    });
  });

  test('input "hoge"', () => {
    const input = [...'hoge'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'success',
      data: null,
      rest: [...'hoge'],
    });
  });
});

describe('or()', () => {
  describe('or([])', () => {
    const parser = or([]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<unknown>>({
        result: 'fail',
      });
    });

    test('input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<unknown>>({
        result: 'fail',
      });
    });
  });

  describe('or([char("a"), char("b")])', () => {
    const parser = or([char('a'), char('b')]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a' | 'b'>>({
        result: 'fail',
      });
    });

    test('input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a' | 'b'>>({
        result: 'success',
        data: 'a',
        rest: [],
      });
    });

    test('input "b"', () => {
      const input = [...'b'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a' | 'b'>>({
        result: 'success',
        data: 'b',
        rest: [],
      });
    });

    test('input "A"', () => {
      const input = [...'A'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a' | 'b'>>({
        result: 'fail',
      });
    });
  });
});

describe('cat()', () => {
  describe('cat([])', () => {
    const parser = cat([]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<[]>>({
        result: 'success',
        data: [],
        rest: [],
      });
    });

    test('input "a"', () => {
      const input = [...'a'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<[]>>({
        result: 'success',
        data: [],
        rest: [...'a'],
      });
    });
  });

  describe('cat([char("a"),char("b")])', () => {
    const parser = cat([char('a'), char('b')]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<['a','b']>>({
        result: 'fail',
      });
    });

    test('input "a"', () => {
      const input = [...'a'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<['a','b']>>({
        result: 'fail',
      });
    });

    test('input "abc"', () => {
      const input = [...'abc'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<['a','b']>>({
        result: 'success',
        data: ['a', 'b'],
        rest: ['c'],
      });
    });

    test('input "A"', () => {
      const input = [...'A'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<['a','b']>>({
        result: 'fail',
      });
    });
  });
});

describe('rep()', () => {
  describe('rep(char("a"))', () => {
    const parser = rep(char('a'));

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: [],
        rest: [],
      });
    });

    test('input "a"', () => {
      const input = [..."a"] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: ['a'],
        rest: [],
      });
    });

    test('input "aa"', () => {
      const input = [..."aa"] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: ['a', 'a'],
        rest: [],
      });
    });

    test('input "aab"', () => {
      const input = [..."aab"] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: ['a', 'a'],
        rest: ['b'],
      });
    });
  });

  describe('rep(char("a"), 1)', () => {
    const parser = rep(char('a'), 1);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'fail',
      });
    });

    test('input "a"', () => {
      const input = [...'a'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: ['a'],
        rest: [],
      });
    });

    test('input "aa"', () => {
      const input = [...'aa'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: ['a', 'a'],
        rest: [],
      });
    });

    test('input "aab"', () => {
      const input = [...'aab'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: ['a', 'a'],
        rest: ['b'],
      });
    });
  });

  describe('rep(char("a"), 1, 2)', () => {
    const parser = rep(char('a'), 1, 2);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'fail',
      });
    });

    test('input "a"', () => {
      const input = [...'a'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: ['a'],
        rest: [],
      });
    });

    test('input "aa"', () => {
      const input = [...'aa'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: ['a', 'a'],
        rest: [],
      });
    });

    test('input "aaa"', () => {
      const input = [...'aaa'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a'[]>>({
        result: 'success',
        data: ['a', 'a'],
        rest: ['a'],
      });
    });
  });
});