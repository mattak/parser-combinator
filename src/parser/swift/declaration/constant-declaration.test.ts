import {constantDeclaration, SwiftConstantDeclaration} from "./constant-declaration";
import {ParserOutput} from "../../../types";

describe('constant-declaration', () => {
  const parser = constantDeclaration;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftConstantDeclaration>>({
      result: 'fail',
    });
  });

  test('Input a', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftConstantDeclaration>>({
      result: 'fail',
    });
  });

  test('Input "let _"', () => {
    const input = [...'let _'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftConstantDeclaration>>({
      result: 'success',
      data: {
        type: 'constant',
        patternInitializers: [
          {
            pattern: {
              type: 'wildcard',
              value: '_',
            },
            initializer: null,
          },
        ],
      },
      rest: []
    });
  });

  test('Input "let _ = , a = , b="', () => {
    const input = [...'let _ = , a = , b='] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftConstantDeclaration>>({
      result: 'success',
      data: {
        type: 'constant',
        patternInitializers: [
          {
            pattern: {
              type: 'wildcard',
              value: '_',
            },
            initializer: {
              expression: null,
            },
          },
          {
            pattern: {
              type: 'identifier',
              value: 'a',
            },
            initializer: {
              expression: null,
            },
          },
          {
            pattern: {
              type: 'identifier',
              value: 'b',
            },
            initializer: {
              expression: null,
            },
          },
        ],
      },
      rest: []
    });
  });

});
