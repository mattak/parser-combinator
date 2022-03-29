import {ParserOutput} from "../../types";
import {value, array, ValueType, ObjectType, object} from "./value";

describe('value', () => {
  const parser = value;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'fail',
    });
  });

  test('Input "hello"', () => {
    const input = [...'"hello"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 'hello',
      rest: [],
    });
  });

  test('Input "\t"hello"\t"', () => {
    const input = [...'"hello"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 'hello',
      rest: [],
    });
  });

  test('Input "\t"42"\t"', () => {
    const input = [...'42'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 42,
      rest: [],
    });
  });

  test('Input " "22""', () => {
    const input = [...' 22'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 22,
      rest: [],
    });
  });

  test('Input "true"', () => {
    const input = [...'true'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: true,
      rest: [],
    });
  });

  test('Input "false"', () => {
    const input = [...'false'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: false,
      rest: [],
    });
  });

  test('Input "null"', () => {
    const input = [...'null'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: null,
      rest: [],
    });
  });

  test('Input "[1, 2, 3]"', () => {
    const input = [...'[1, 2, 3]'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: [1, 2, 3],
      rest: []
    });
  });

  test('Input "{ "answer": 12, "absolute-zero": -123.45 }"', () => {
    const input = [...'{ "answer": 12, "absolute-zero": -123.45 }'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: {"answer": 12, "absolute-zero": -123.45},
      rest: [],
    });
  });
});

describe('array', () => {
  const parser = array;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'fail',
    });
  });

  test('input "hello"', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'fail',
    });
  });

  test('input []', () => {
    const input = [...'[]'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [],
      rest: [],
    });
  });

  test('input "[1]"', () => {
    const input = [...'[1]'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [1],
      rest: [],
    });
  });

  test('input "[1, "2", false, null]"', () => {
    const input = [...'[1, "2", false, null]'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [1, "2", false, null],
      rest: [],
    });
  });

  test('Input "[1, "2", false, null]"', () => {
    const input = [...'[1, "2", false, null]'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [1, '2', false, null],
      rest: []
    });
  });
});

describe('object', () => {
  const parser = object;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'fail'
    });
  });

  test('Input "hello"', () => {
    const input = [...'hello'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'fail'
    });
  });

  test('Input {}', () => {
    const input = [...'{}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'success',
      data: {},
      rest: [],
    });
  });

  test('Input "{ "answer-to-the-ultimate-question" : 42 }', () => {
    const input = [...'{ "answer-to-the-ultimate-question" : 42 }'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'success',
      data: {"answer-to-the-ultimate-question": 42},
      rest: [],
    });
  });

  test('Input "{ "number" : 1, "string": "hello", "boolean": true, "null": null }', () => {
    const input = [...'{ "number" : 1, "string": "hello", "boolean": true, "null": null }'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'success',
      data: {"number": 1, "string": "hello", "boolean": true, "null": null},
      rest: [],
    });
  });
});