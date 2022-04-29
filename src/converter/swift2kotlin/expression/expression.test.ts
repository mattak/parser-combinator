import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {
  SwiftExpression,
  SwiftPostfixExpressionPrimary,
  SwiftPrefixExpression,
  SwiftPrimaryExpressionIdentifier
} from "../../../syntax/swift";
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
  KotlinMultiplicativeExpression,
  KotlinPostfixUnaryExpression,
  KotlinPrefixUnaryExpression, KotlinPrimaryExpressionSimpleIdentifier,
  KotlinRangeExpression, KotlinSimpleIdentifier
} from "../../../syntax/kotlin";
import {convert_expression_expression} from "./expression";

describe('expression', () => {
  const converter = convert_expression_expression;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
  }

  test('default', () => {
    const input = <SwiftExpression>{
      prefix: <SwiftPrefixExpression>{
        prefixOperator: null,
        postfixExpression: <SwiftPostfixExpressionPrimary>{
          type: 'primary',
          value: <SwiftPrimaryExpressionIdentifier>{
            type: 'identifier',
            value: 'a',
          },
        },
      },
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinExpression>(
      <KotlinExpression>{
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
                                        primaryExpression: <KotlinPrimaryExpressionSimpleIdentifier>{
                                          type: 'simpleIdentifier',
                                          value: <KotlinSimpleIdentifier>{value: 'a'},
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
                }
              ]
            }
          ]
        }
      },
    );
  });
});
