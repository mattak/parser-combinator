import {constantDeclaration} from "./constant-declaration";
import {ParserOutput} from "../../../types";
import {
  SwiftConstantDeclaration,
  SwiftLiteralExpression,
  SwiftPostfixExpressionPrimary,
  SwiftPrimaryExpression
} from "../../../syntax/swift";

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


  test('Input: "let a = 1"', () => {
    const input = [...'let a = 1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftConstantDeclaration>>({
      result: 'success',
      data: {
        type: 'constant',
        patternInitializers: [
          {
            pattern: {
              type: 'identifier',
              value: 'a',
            },
            initializer: {
              prefix: {
                prefixOperator: null,
                postfixExpression: <SwiftPostfixExpressionPrimary>{
                  type: 'primary',
                  value: <SwiftPrimaryExpression>{
                    type: 'literal',
                    value: <SwiftLiteralExpression>{
                      type: 'literal',
                      value: {
                        type: 'numeric',
                        numericType: 'integer',
                        value: '1',
                      }
                    },
                  }
                },
              }
            },
          },
        ],
      },
      rest: []
    });
  });

  test('Input "let _, a, b"', () => {
    const input = [...'let _, a, b'] as const;
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
          {
            pattern: {
              type: 'identifier',
              value: 'a',
            },
            initializer: null,
          },
          {
            pattern: {
              type: 'identifier',
              value: 'b',
            },
            initializer: null,
          },
        ],
      },
      rest: []
    });
  });
});
