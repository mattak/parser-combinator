import {
  KotlinAdditiveExpression,
  KotlinAsExpression,
  KotlinComparison,
  KotlinConjunction,
  KotlinDisjunction,
  KotlinElvisExpression,
  KotlinEquality,
  KotlinExpression,
  KotlinGenericCallLikeComparison,
  KotlinInfixFunctionCall,
  KotlinInfixOperation,
  KotlinJumpExpression,
  KotlinJumpExpressionBreak,
  KotlinJumpExpressionReturn,
  KotlinMultiplicativeExpression,
  KotlinPostfixUnaryExpression,
  KotlinPrefixUnaryExpression,
  KotlinPrimaryExpressionJumpExpression,
  KotlinRangeExpression,
  KotlinStatement,
  KotlinStatementExpression
} from "../../../syntax/kotlin";
import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftBreakStatement, SwiftExpression, SwiftReturnStatement} from "../../../syntax/swift";
import {
  convert_controlTransferStatement_jumpExpression,
  convert_controlTransferStatement_statement
} from "./control-transfer-statement";

describe('convert_controlTransferStatement_statement', () => {
  const converter = convert_controlTransferStatement_statement;
  const mock = jest.fn().mockImplementation(x => <KotlinJumpExpression>{});
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'control-transfer-statement__jumpExpression': mock,
  }

  test('default', () => {
    const input = <SwiftBreakStatement>{
      type: 'break',
      label: null,
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinStatement>(
      <KotlinStatement>{
        value: <KotlinStatementExpression>{
          type: 'expression',
          value: <KotlinExpression>{
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
                                            primaryExpression: <KotlinPrimaryExpressionJumpExpression>{
                                              type: 'jumpExpression',
                                              value: <KotlinJumpExpression>{},
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                        nextGenericCallLikeComparisons: [],
                      },
                      nextComparisons: [],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    );
  });
});

describe('convert_controlTransferStatement_jumpExpression', () => {
  const converter = convert_controlTransferStatement_jumpExpression;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'expression': jest.fn().mockImplementation(() => <KotlinExpression>{})
  }

  test('break:null', () => {
    const input = <SwiftBreakStatement>{
      type: 'break',
      label: null,
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinJumpExpressionBreak>(
      <KotlinJumpExpressionBreak>{
        type: 'break',
        label: null,
      }
    );
  });

  test('break:label', () => {
    const input = <SwiftBreakStatement>{
      type: 'break',
      label: 'label',
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinJumpExpressionBreak>(
      <KotlinJumpExpressionBreak>{
        type: 'break',
        label: 'label',
      }
    );
  });

  test('return:null', () => {
    const input = <SwiftReturnStatement>{
      type: 'return',
      expression: null,
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinJumpExpressionReturn>(
      <KotlinJumpExpressionReturn>{
        type: 'return',
        label: null,
        expression: null,
      }
    );
  });

  test('return:expression', () => {
    const input = <SwiftReturnStatement>{
      type: 'return',
      expression: <SwiftExpression>{},
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinJumpExpressionReturn>(
      <KotlinJumpExpressionReturn>{
        type: 'return',
        label: null,
        expression: <KotlinExpression>{},
      }
    );
  });
});
