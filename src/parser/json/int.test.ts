import { int } from './int';
import {ParserOutput} from "../../types";

describe('int', () => {
  const parser = int;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('input "true"', () => {
    const input = [..."true"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('input "0"', () => {
    const input = [..."0"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 0,
      rest: [],
    });
  });

  test('input "56"', () => {
    const input = [..."56"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 56,
      rest: [],
    });
  });

  test('input "-123"', () => {
    const input = [..."-123"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: -123,
      rest: [],
    });
  });

  test('input "+987654321"', () => {
    const input = [..."+987654321"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 987654321,
      rest: [],
    });
  });
});