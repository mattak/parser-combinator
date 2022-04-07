import {
  createStringClosingDelimiter,
  createStringOpeningDelimiter,
  quotedTextItem,
  stringLiteral
} from "./string-literal";
import {ParserOutput} from "../../../types";

describe('createStringOpeningDelimiter:1', () => {
  const parser = createStringOpeningDelimiter(1);

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

  test('Input """', () => {
    const input = [...'"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '"',
      rest: []
    });
  });

  test('Input "#""', () => {
    const input = [...'#"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '#"',
      rest: []
    });
  });

  test('Input "##""', () => {
    const input = [...'##"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '##"',
      rest: []
    });
  });

  test('Input "##"abc"', () => {
    const input = [...'##"abc'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '##"',
      rest: ['a', 'b', 'c']
    });
  });
});

describe('createStringOpeningDelimiter:3', () => {
  const parser = createStringOpeningDelimiter(3);

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

  test('Input "\"\"\""', () => {
    const input = [...'"""'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '"""',
      rest: []
    });
  });

  test('Input "#\"\"\""', () => {
    const input = [...'#"""'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '#"""',
      rest: []
    });
  });

  test('Input "##""""', () => {
    const input = [...'##"""'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '##"""',
      rest: []
    });
  });

  test('Input "##\"\"\"abc"', () => {
    const input = [...'##\"\"\"abc'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '##"""',
      rest: ['a', 'b', 'c']
    });
  });
});

describe('createStringClosingDelimiter(1, 0)', () => {
  const parser = createStringClosingDelimiter(1, 0);

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

  test('Input "\""', () => {
    const input = [...'"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '"',
      rest: [],
    });
  });

  test('Input ""a"', () => {
    const input = [...'"a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '"',
      rest: ['a']
    });
  });
});

describe('createStringClosingDelimiter(3, 1)', () => {
  const parser = createStringClosingDelimiter(3, 1);

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

  test('Input """', () => {
    const input = [...'"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input """""', () => {
    const input = [...'"""'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('Input """"#"', () => {
    const input = [...'"""#'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '"""#',
      rest: [],
    });
  });

  test('Input """"##"', () => {
    const input = [...'"""##'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: '"""#',
      rest: ['#'],
    });
  });

  test('Input """""#"', () => {
    const input = [...'""""##'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });
});

describe('quoteTextItem', () => {
  describe('escape-character', () => {
    const parser = quotedTextItem;

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'fail'
      });
    });

    test('Input \\0', () => {
      const input = [...'\\0'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: '\\0',
        rest: [],
      });
    });

    test('Input \\\\', () => {
      const input = [...'\\\\'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: '\\\\',
        rest: [],
      });
    });

    test('Input \\t', () => {
      const input = [...'\\t'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: '\\t',
        rest: [],
      });
    });

    test('Input \\n', () => {
      const input = [...'\\n'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: '\\n',
        rest: [],
      });
    });

    test('Input \\r', () => {
      const input = [...'\\r'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: '\\r',
        rest: [],
      });
    });

    test('Input \\"', () => {
      const input = [...'\\"'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: '\\"',
        rest: [],
      });
    });

    test('Input \\\'', () => {
      const input = [...'\\\''] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: '\\\'',
        rest: [],
      });
    });

    test('Input \\u{12ab}', () => {
      const input = [...'\\u{12ab}'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: '\\u{12ab}',
        rest: [],
      });
    });

    test('Input abc', () => {
      const input = [...'abc'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: 'a',
        rest: [...'bc'],
      });
    });

    test('Input "', () => {
      const input = [...'"'] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'fail',
      });
    });
  });
});

describe('stringLiteral.staticStringLiteral', () => {
  const parser = stringLiteral;

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

  test('Input "hello"', () => {
    const input = [...'"hello"'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: 'hello',
      rest: [],
    });
  });

  test('Input #"hello"#', () => {
    const input = [...'#"hello"#'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: 'hello',
      rest: [],
    });
  });

  test('Input ##"hello world"##', () => {
    const input = [...'#"hello world"#'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: 'hello world',
      rest: [],
    });
  });

  test('Input ##"first"second"#"##', () => {
    const input = [...'##"first"second"#"##'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: 'first"second"#',
      rest: [],
    });
  });

  test('Input " \\" "', () => {
    const input = [...'" \\" "'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'success',
      data: ' \\" ',
      rest: [],
    });
  });
});

