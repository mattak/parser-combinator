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
  KotlinPrefixUnaryExpression,
  KotlinPrimaryExpression,
  KotlinPrimaryExpressionSimpleIdentifier,
  KotlinRangeExpression,
  KotlinSimpleIdentifier
} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftLiteralExpression, SwiftPostfixExpression, SwiftPrimaryExpression} from "../../../syntax/swift";

export function createKotlinExpression(primaryExpression: KotlinPrimaryExpression): KotlinExpression {
  return <KotlinExpression>{
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
                                    primaryExpression: primaryExpression,
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
  }
}

export function convert_postfixExpression_primaryExpression(table: SwiftKotlinConvertTable, input: SwiftPostfixExpression): KotlinPrimaryExpression {
  switch (input.type) {
    case "primary":
      return table['primary-expression'](table, input.value)
    default:
      throw new Error(`Not implemented type: ${input.type}`)
  }
}

export function convert_primaryExpression_primaryExpression(table: SwiftKotlinConvertTable, input: SwiftPrimaryExpression): KotlinPrimaryExpression {
  switch (input.type) {
    case "identifier":
      return <KotlinPrimaryExpressionSimpleIdentifier>{
        type: 'simpleIdentifier',
        value: <KotlinSimpleIdentifier>{
          value: input.value,
        },
      }
    case "literal":
      return table['literal-expression'](table, input.value)
  }
}

export function convert_literalExpression_primaryExpression(table: SwiftKotlinConvertTable, input: SwiftLiteralExpression): KotlinPrimaryExpression {
  switch (input.type) {
    case "literal":
      return table['literal__primary-expression'](table, input.value)
    default:
      throw new Error(`not implemented type: ${input.type}`)
  }
}
