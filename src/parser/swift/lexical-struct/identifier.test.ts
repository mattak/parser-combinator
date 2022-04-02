import {ParserOutput} from "../../../types";
import {identifier} from "./identifier";

describe('identifier', () => {
  const parser = identifier;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail'
    });
  });

  test('input "a"', () => {
    const input = [..."a"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: 'a',
      rest: [],
    });
  });

  test('input "`abc`"', () => {
    const input = [..."`abc`"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: 'abc',
      rest: [],
    });
  });

  test('input "$1"', () => {
    const input = [..."$1"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '$1',
      rest: [],
    });
  });

  test('input "$a123"', () => {
    const input = [..."$a123"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '$a123',
      rest: [],
    });
  });

  test('input "$_"', () => {
    const input = [..."$_"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '$_',
      rest: [],
    });
  });
});
