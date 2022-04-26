import {ParserOutput} from "../../../types";
import {structBody, structDeclaration} from "./struct-declaration";
import {
  SwiftConstantDeclaration,
  SwiftInitializer,
  SwiftLiteral,
  SwiftLiteralExpression,
  SwiftPattern,
  SwiftPatternInitializer,
  SwiftPostfixExpressionPrimary,
  SwiftPrefixExpression,
  SwiftPrimaryExpression,
  SwiftStructDeclaration,
  SwiftStructMember,
  SwiftStructMemberDeclaration
} from "../../../syntax/swift";

describe('structBody', () => {
  const parser = structBody;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructMember[]>>({
      result: 'fail'
    });
  });

  test('Input: {}', () => {
    const input = [...'{}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructMember[]>>({
      result: 'success',
      data: [],
      rest: [],
    });
  });

  test('Input: { let a = 1 }', () => {
    const input = [...'{ let a = 1 }'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructMember[]>>({
      result: 'success',
      data: [
        <SwiftStructMemberDeclaration>{
          type: 'declaration',
          value: <SwiftConstantDeclaration>{
            type: 'constant',
            patternInitializers: [
              <SwiftPatternInitializer>{
                pattern: <SwiftPattern>{type: 'identifier', value: "a"},
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
              },
            ],
          }
        }
      ],
      rest: [],
    });
  });

  test('Input: { let a = 1\n let b = 2 }', () => {
    const input = [..."{ let a = 1\n let b = 2 }"] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructMember[]>>({
      result: 'success',
      data: [
        <SwiftStructMemberDeclaration>{
          type: 'declaration',
          value: <SwiftConstantDeclaration>{
            type: 'constant',
            patternInitializers: [
              <SwiftPatternInitializer>{
                pattern: <SwiftPattern>{type: 'identifier', value: "a"},
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
              },
            ],
          }
        },
        <SwiftStructMemberDeclaration>{
          type: 'declaration',
          value: <SwiftConstantDeclaration>{
            type: 'constant',
            patternInitializers: [
              <SwiftPatternInitializer>{
                pattern: <SwiftPattern>{type: 'identifier', value: "b"},
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
                            value: '2',
                          },
                        },
                      }
                    },
                  }
                },
              },
            ],
          }
        },
      ],
      rest: [],
    });
  });
});

describe('struct', () => {
  const parser = structDeclaration;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructDeclaration>>({
      result: 'fail'
    });
  });

  test('Input: struct MyStruct {}', () => {
    const input = [...'struct MyStruct {}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStructDeclaration>>({
      result: 'success',
      data: <SwiftStructDeclaration>{
        type: 'struct',
        name: 'MyStruct',
        accessLevelModifier: null,
        body: [],
      },
      rest: [],
    });
  });
});