import {ParserOutput} from "../../../types";
import {binaryLiteral, decimalLiteral, hexadecimalLiteral, integerLiteral, octalLiteral} from "./integer-literal";

describe('binaryLiteral', () => {
  const parser = binaryLiteral;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('input "0b"', () => {
    const input = [...'0b'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });


  test('input "0b0"', () => {
    const input = [...'0b0'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 0,
      rest: [],
    });
  });

  test('input "0b1"', () => {
    const input = [...'0b1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 1,
      rest: [],
    });
  });

  test('input "0b0_1"', () => {
    const input = [...'0b0_1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 1,
      rest: [],
    });
  });

  test('input "0b00_11_00"', () => {
    const input = [...'0b00_11_00'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 12,
      rest: [],
    });
  });
});

describe('octalLiteral', () => {
  const parser = octalLiteral;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('input "0o"', () => {
    const input = [...'0o'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });


  test('input "0o0"', () => {
    const input = [...'0o0'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 0,
      rest: [],
    });
  });

  test('input "0o7"', () => {
    const input = [...'0o1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 1,
      rest: [],
    });
  });

  test('input "0o8"', () => {
    const input = [...'0o8'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('input "0o0_1"', () => {
    const input = [...'0o0_1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 1,
      rest: [],
    });
  });

  test('input "0o00_01_00"', () => {
    const input = [...'0o00_01_00'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 64,
      rest: [],
    });
  });
});

describe('decimalLiteral', () => {
  const parser = decimalLiteral;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('input "0"', () => {
    const input = [...'0'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 0,
      rest: [],
    });
  });


  test('input "00"', () => {
    const input = [...'00'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 0,
      rest: [],
    });
  });

  test('input "12"', () => {
    const input = [...'12'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 12,
      rest: [],
    });
  });

  test('input "0_123"', () => {
    const input = [...'0_123'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 123,
      rest: [],
    });
  });

  test('input "1_234_56"', () => {
    const input = [...'1_234_56'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 123456,
      rest: [],
    });
  });
});

describe('hexadecimalLiteral', () => {
  const parser = hexadecimalLiteral;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('input "0x"', () => {
    const input = [...'0x'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });


  test('input "0x0"', () => {
    const input = [...'0x0'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 0,
      rest: [],
    });
  });

  test('input "0x10"', () => {
    const input = [...'0x10'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 16,
      rest: [],
    });
  });

  test('input "0xf"', () => {
    const input = [...'0xf'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 15,
      rest: [],
    });
  });

  test('input "0xE"', () => {
    const input = [...'0xE'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 14,
      rest: [],
    });
  });

  test('input "0x9_F"', () => {
    const input = [...'0x9_F'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 159,
      rest: [],
    });
  });

  test('input "0xFF_ff_FF"', () => {
    const input = [...'0xFF_ff_FF'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 16777215,
      rest: [],
    });
  });
});

describe('integerLiteral', () => {
  const parser = integerLiteral;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail',
    });
  });

  test('input "0b10"', () => {
    const input = [...'0b10'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 2,
      rest: [],
    });
  });

  test('input "0o10"', () => {
    const input = [...'0o10'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 8,
      rest: [],
    });
  });

  test('input "10"', () => {
    const input = [...'10'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 10,
      rest: [],
    });
  });

  test('input "0x10"', () => {
    const input = [...'0x10'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 16,
      rest: [],
    });
  });
});