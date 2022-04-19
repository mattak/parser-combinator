import {SwiftKotlinConvertTable} from "../swift-converter";
import {KotlinPropertyDeclaration, KotlinVariableDeclaration} from "../../../syntax/kotlin";
import {
  SwiftConstantDeclaration,
  SwiftInitializer,
  SwiftLiteral,
  SwiftLiteralExpression,
  SwiftPattern,
  SwiftPatternInitializer
} from "../../../syntax/swift";
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
  KotlinIntegerLiteral,
  KotlinLiteralConstant,
  KotlinMultiplicativeExpression,
  KotlinNullLiteral,
  KotlinPostfixUnaryExpression,
  KotlinPrefixUnaryExpression,
  KotlinPrimaryExpression,
  KotlinRangeExpression
} from "../../../syntax/kotlin/expressions/expressions";

export function convert_constantDeclaration_propertyDeclaration(table: SwiftKotlinConvertTable, input: SwiftConstantDeclaration): KotlinPropertyDeclaration[] {
  return input.patternInitializers.map(x => table['pattern-initializer'](table, x));
}

export function convert_patternInitializer_propertyDeclaration(table: SwiftKotlinConvertTable, input: SwiftPatternInitializer): KotlinPropertyDeclaration {
  return <KotlinPropertyDeclaration>{
    type: 'val',
    variableDeclaration: table['pattern'](table, input.pattern),
    // typeConstraints?
    // (('=' expression) | propertyDelegate)? ';'?
    expression: input.initializer !== null ? table['initializer'](table, input.initializer) : null,
  };
}

export function convert_pattern_variableDeclaration(table: SwiftKotlinConvertTable, input: SwiftPattern): KotlinVariableDeclaration {
  switch (input.type) {
    case "identifier":
      return <KotlinVariableDeclaration>{
        name: (<SwiftPattern>input).value,
      }
    case "wildcard":
      return <KotlinVariableDeclaration>{
        name: '_',
      }
    default:
      throw new Error(`not implemented input.type: ${input}`)
  }
}

export function convert_initializer_expression(table: SwiftKotlinConvertTable, input: SwiftInitializer): KotlinExpression {
  const postfixExpression = input.prefix.postfixExpression
  switch (postfixExpression.type) {
    case "primary":
      const primaryExpression = postfixExpression.value
      switch (primaryExpression.type) {
        case "literal":
          const literalExpression: SwiftLiteralExpression = primaryExpression.value
          switch (literalExpression.type) {
            case "literal":
              const literal = literalExpression.value
              const literalConstant = table['literal'](table, literal);
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
                                                primaryExpression: <KotlinPrimaryExpression>{
                                                  type: 'literalConstant',
                                                  value: literalConstant,
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
      }
  }

  throw Error(`not implemented converter of: ${input}`)
}
