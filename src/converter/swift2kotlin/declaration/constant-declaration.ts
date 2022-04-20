import {SwiftKotlinConvertTable} from "../swift-converter";
import {KotlinPropertyDeclaration, KotlinVariableDeclaration} from "../../../syntax/kotlin";
import {SwiftConstantDeclaration, SwiftInitializer, SwiftPattern, SwiftPatternInitializer} from "../../../syntax/swift";
import {KotlinExpression} from "../../../syntax/kotlin/expressions/expressions";

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
  return table['expression'](table, input);
}
