import {floatingPointLiteral} from "./floating-point-literal";
import {ParserOutput} from "../../../types";

describe('floatingPointLiteral', () => {
  const parser = floatingPointLiteral;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail'
    });
  });

  test('Input "a"', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail'
    });
  });

  test('Input "1"', () => {
    const input = [...'1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '1',
      rest: [],
    });
  });

  test('Input "2.012"', () => {
    const input = [...'2.012'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '2.012',
      rest: [],
    });
  });

  test('Input "1.23_4e+2"', () => {
    const input = [...'1.23_4e+2'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '1.23_4e+2',
      rest: [],
    });
  });

  test('Input "2.012E-2_34"', () => {
    const input = [...'2.012E-2_34'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '2.012E-2_34',
      rest: [],
    });
  });

  test('Input "0xaP1"', () => {
    const input = [...'0xaP1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '0xaP1',
      rest: [],
    });
  });

  test('Input "0x12.ABp+1_2"', () => {
    const input = [...'0x12.ABp+1_2'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '0x12.ABp+1_2',
      rest: [],
    });
  });

  test('Input "0x12.ABp+1_2)"', () => {
    const input = [...'0x12.ABp+1_2)'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '0x12.ABp+1_2',
      rest: [')'],
    });
  });
});