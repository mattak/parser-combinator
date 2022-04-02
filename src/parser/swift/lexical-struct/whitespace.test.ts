import {comment, multilineComment, whitespace} from "../lexical-struct/whitespace";
import {ParserOutput} from "../../../types";

describe('comment', () => {
  const parser = comment;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail'
    });
  });

  test('Input "//"', () => {
    const input = [...'//'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input "//a"', () => {
    const input = [...'//a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input "//a\\n"', () => {
    const input = [...'//a\n'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: 'a\n',
      rest: []
    });
  });

  test('Input "// hello world!! \\r\\n"', () => {
    const input = [...'// hello world!! \r\n'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: ' hello world!! \r\n',
      rest: []
    });
  });
});

describe('multilineComment', () => {
  const parser = multilineComment;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input "/*"', () => {
    const input = [...'/*'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input "/**/"', () => {
    const input = [...'/**/'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input "/* */"', () => {
    const input = [...'/* */'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: ' ',
      rest: []
    });
  });

  test('Input "/*a\nb*/"', () => {
    const input = [...'/*a\nb*/'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: 'a\nb',
      rest: []
    });
  });

  test('Input "/* /* */"', () => {
    const input = [...'/* /* */'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input "/*/* */*/"', () => {
    const input = [...'/*/* */*/'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: ' ',
      rest: [],
    });
  });

  test('Input "/*/**/*/"', () => {
    const input = [...'/*/**/*/'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });
});

describe('whitespace', () => {
  const parser = whitespace;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input "a"', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input "\n"', () => {
    const input = [...'\n'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '\n',
      rest: []
    });
  });

  test('Input "\t"', () => {
    const input = [...'\t'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '\t',
      rest: []
    });
  });

  test('Input " "', () => {
    const input = [...' '] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: ' ',
      rest: []
    });
  });

  test('Input "// hello \n // world\n"', () => {
    const input = [...'// hello \n // world\n'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: ' hello \n  world\n',
      rest: []
    });
  });

  test('Input " /* secret comment */"', () => {
    const input = [...' /* secret comment */'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '  secret comment ',
      rest: []
    });
  });
});