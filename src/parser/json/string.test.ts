import { string } from './string';
import {ParserOutput} from "../../types";

describe('string', () => {
  const parser = string;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail'
    });
  });

  test('Input "hello"', () => {
    const input = [...'hello'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail'
    });
  });

  test('Input "\'hello\'"', () => {
    const input = [..."'hello'"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input ""hoge\tfuga""', () => {
    const input = [...'"hoge\tfuga"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input ""hello""', () => {
    const input = [...'"hello"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: 'hello',
      rest: [],
    });
  });

  test('Input ""\\a""', () => {
    const input = [...'"\\a"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input ""\\b\\t\\n\\f\\r\\"\\/\\\\""', () => {
    const input = [...'"\\b\\t\\n\\f\\r\\"\\/\\\\"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '\b\t\n\f\r\"\/\\',
      rest: [],
    });
  });

  test('Input ""[/\\/\\u002F\\u002f]""', () => {
    const input = [...'"[/\\/\\u002F\\u002f]"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '[////]',
      rest: [],
    });
  });

  test('Input ""[\\ud83c\\udf63]""', () => {
    const input = [...'"\\ud83c\\udf63"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '🍣',
      rest: [],
    });
  });
});