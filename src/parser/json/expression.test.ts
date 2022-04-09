import {expr} from './expression';
import type {ParserOutput} from "../../types";

describe('init', () => {
  const parser = expr;

  test('Empty Input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('Input true', () => {
    const input = [...'true'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('Input 12', () => {
    const input = [...'12'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 12,
      rest: [],
    });
  });

  test('Input 1+2', () => {
    const input = [...'1+2'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 1 + 2,
      rest: [],
    });
  });

  test('Input 2-1', () => {
    const input = [...'2-1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 2 - 1,
      rest: [],
    });
  });

  test('Input 8*9', () => {
    const input = [...'8*9'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 8 * 9,
      rest: [],
    });
  });

  test('Input 1024*8', () => {
    const input = [...'1024/8'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 1024 / 8,
      rest: [],
    });
  });

  test('Input 3*(5-2)', () => {
    const input = [...'3*(5-2)'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 3 * (5 - 2),
      rest: [],
    });
  });

  test('Input 42+3*(2-5)', () => {
    const input = [...'42+3*(2-5)'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 42 + 3 * (2 - 5),
      rest: [],
    });
  });
});