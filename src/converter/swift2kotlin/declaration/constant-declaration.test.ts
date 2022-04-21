import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {
  SwiftBooleanLiteral,
  SwiftConstantDeclaration,
  SwiftInitializer,
  SwiftLiteralExpressionLiteral,
  SwiftPatternIdentifier,
  SwiftPatternInitializer,
  SwiftPatternWildcard,
  SwiftPostfixExpression,
  SwiftPrefixExpression,
  SwiftPrimaryExpressionLiteral
} from "../../../syntax/swift";
import {KotlinPropertyDeclaration, KotlinVariableDeclaration} from "../../../syntax/kotlin";
import {
  convert_constantDeclaration_propertyDeclarations,
  convert_initializer_expression,
  convert_pattern_variableDeclaration
} from "./constant-declaration";
import {
  KotlinAdditiveExpression,
  KotlinAsExpression,
  KotlinBooleanLiteral,
  KotlinComparison,
  KotlinConjunction,
  KotlinDisjunction,
  KotlinElvisExpression,
  KotlinEquality,
  KotlinExpression,
  KotlinGenericCallLikeComparison,
  KotlinInfixFunctionCall,
  KotlinInfixOperation,
  KotlinMultiplicativeExpression,
  KotlinPostfixUnaryExpression,
  KotlinPrefixUnaryExpression,
  KotlinPrimaryExpression,
  KotlinRangeExpression
} from "../../../syntax/kotlin/expressions/expressions";

describe('convert_constantDeclaration_propertyDeclaration', () => {
  const converter = convert_constantDeclaration_propertyDeclarations;
  const mock = jest.fn().mockImplementation(() => <KotlinPropertyDeclaration>{})
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'pattern-initializer': mock,
  }

  test('default', () => {
    const input = <SwiftConstantDeclaration>{
      type: 'constant',
      patternInitializers: [],
    };
    const output = converter(table, input);
    expect(output).toEqual([]);
    expect(mock).toBeCalledTimes(0);
  })

  test('multiple', () => {
    const input = <SwiftConstantDeclaration>{
      type: 'constant',
      patternInitializers: [<SwiftPatternInitializer>{}],
    };
    const output = converter(table, input);
    expect(output).toEqual([{}]);
    expect(mock).toBeCalledTimes(1);
  })
});

describe('convert_pattern_variableDeclaration', () => {
  const converter = convert_pattern_variableDeclaration;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
  }

  test('default', () => {
    const input = <SwiftPatternIdentifier>{
      type: 'identifier',
      value: 'a',
    };
    const output = converter(table, input);
    expect(output).toEqual(<KotlinVariableDeclaration>{
      name: 'a',
    });
  })

  test('wildcard', () => {
    const input = <SwiftPatternWildcard>{
      type: 'wildcard',
      value: '_',
    };
    const output = converter(table, input);
    expect(output).toEqual(<KotlinVariableDeclaration>{
      name: '_',
    });
  })
});

describe('convert_initializer_expression', () => {
  const converter = convert_initializer_expression;
  const mock = jest.fn().mockImplementation(() => {
    return <KotlinBooleanLiteral>{
      type: 'boolean',
      value: true,
    }
  });
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'literal': mock,
  }

  test('default', () => {
    const input = <SwiftInitializer>{
      prefix: <SwiftPrefixExpression>{
        prefixOperator: null,
        postfixExpression: <SwiftPostfixExpression>{
          type: 'primary',
          value: <SwiftPrimaryExpressionLiteral>{
            type: 'literal',
            value: <SwiftLiteralExpressionLiteral>{
              type: 'literal',
              value: <SwiftBooleanLiteral>{
                type: 'boolean',
                value: true,
              },
            },
          },
        },
      },
    };
    const output = converter(table, input);
    expect(output).toEqual(<KotlinExpression>{
      disjunction: <KotlinDisjunction>{
        conjunctions: [
          <KotlinConjunction>{
            equalities: [
              <KotlinEquality>{
                comparison: <KotlinComparison>{
                  genericCallLikeComparison: <KotlinGenericCallLikeComparison>{
                    infixOperation: <KotlinInfixOperation>{
                      elvisExpression: <KotlinElvisExpression>{
                        infixFunctionCall: <KotlinInfixFunctionCall>{
                          rangeExpression: <KotlinRangeExpression>{
                            additiveExpression: <KotlinAdditiveExpression>{
                              multiplicativeExpression: <KotlinMultiplicativeExpression>{
                                asExpression: <KotlinAsExpression>{
                                  prefixUnaryExpression: <KotlinPrefixUnaryExpression>{
                                    postfixUnaryExpression: <KotlinPostfixUnaryExpression>{
                                      primaryExpression: <KotlinPrimaryExpression>{
                                        type: 'literalConstant',
                                        value: <KotlinBooleanLiteral>{
                                          type: "boolean",
                                          value: true,
                                        },
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  nextGenericCallLikeComparisons: [],
                },
                nextComparisons: [],
              }
            ]
          }
        ]
      }
    });
  })
});
