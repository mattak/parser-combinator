import {ParserOutput} from "../../../types";
import {declaration} from "./declaration";
import {
  SwiftConstantDeclaration,
  SwiftDeclaration,
  SwiftFunctionBody,
  SwiftFunctionDeclaration,
  SwiftFunctionHead,
  SwiftFunctionSignature,
  SwiftImportDeclaration,
  SwiftInitializer,
  SwiftLiteral,
  SwiftLiteralExpression,
  SwiftPatternIdentifier,
  SwiftPatternInitializer,
  SwiftPostfixExpressionPrimary,
  SwiftPrefixExpression,
  SwiftPrimaryExpression
} from "../../../syntax/swift";

describe('declaration', () => {
  const parser = declaration;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<unknown>>({
      result: 'fail',
    });
  });

  test('Input let _', () => {
    const input = [...'let _'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<unknown>>({
      result: 'success',
      data: <SwiftConstantDeclaration>{
        type: 'constant',
        patternInitializers: [
          {
            pattern: {
              type: 'wildcard',
              value: '_',
            },
            initializer: null,
          }
        ]
      },
      rest: [],
    });
  });

  test('import Foundation', () => {
    const input = [...'import Foundation'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftDeclaration>>({
      result: 'success',
      data: <SwiftImportDeclaration>{
        type: 'import',
        attributes: null,
        kind: null,
        path: 'Foundation',
      },
      rest: [],
    });
  });

  test('constant: let a = 1', () => {
    const input = [...'let a = 1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftDeclaration>>({
      result: 'success',
      data: <SwiftConstantDeclaration>{
        type: 'constant',
        patternInitializers: [
          <SwiftPatternInitializer>{
            pattern: <SwiftPatternIdentifier>{
              type: 'identifier',
              value: 'a',
            },
            initializer: <SwiftInitializer>{
              prefix: <SwiftPrefixExpression>{
                prefixOperator: null,
                postfixExpression: <SwiftPostfixExpressionPrimary>{
                  type: 'primary',
                  value: <SwiftPrimaryExpression>{
                    type: 'literal',
                    value: <SwiftLiteralExpression>{
                      type: 'literal',
                      value: <SwiftLiteral>{
                        type: 'numeric',
                        numericType: 'integer',
                        value: '1',
                      },
                    },
                  }
                },
              }
            },
          }
        ],
      },
      rest: [],
    });
  });

  test('function: func run(){}', () => {
    const input = [...'func run(){}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftDeclaration>>({
      result: 'success',
      data: <SwiftFunctionDeclaration>{
        type: 'function',
        head: <SwiftFunctionHead>{modifiers: []},
        name: 'run',
        signature: <SwiftFunctionSignature>{
          parameters: [],
          isAsync: false,
          isThrows: false,
          result: null,
        },
        genericWhere: null,
        body: <SwiftFunctionBody>{
          statements: [],
        },
      },
      rest: [],
    });
  });
});
