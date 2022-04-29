import {SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftExpression} from "../../../syntax/swift";
import {KotlinExpression} from "../../../syntax/kotlin";
import {convert_postfixExpression_primaryExpression, createKotlinExpression} from "./primary-expression";

export function convert_expression_expression(table: SwiftKotlinConvertTable, input: SwiftExpression): KotlinExpression {
  const postfixExpression = input.prefix.postfixExpression
  const primaryExpression = convert_postfixExpression_primaryExpression(table, postfixExpression);
  return createKotlinExpression(primaryExpression);
}
