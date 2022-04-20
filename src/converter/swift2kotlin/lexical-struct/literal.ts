import {SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftLiteral} from "../../../syntax/swift";
import {
  KotlinBooleanLiteral,
  KotlinIntegerLiteral,
  KotlinLiteralConstant,
  KotlinNullLiteral,
  KotlinPrimaryExpression,
  KotlinPrimaryExpressionLiteralConstant,
  KotlinPrimaryExpressionStringLiteral
} from "../../../syntax/kotlin/expressions/expressions";
import {KotlinStringLiteral} from "../../../syntax/kotlin/expressions/string-literal";

export function convert_literal_primaryExpression(table: SwiftKotlinConvertTable, input: SwiftLiteral): KotlinPrimaryExpression {
  switch (input.type) {
    case "string":
      return <KotlinPrimaryExpressionStringLiteral>{
        type: 'stringLiteral',
        value: <KotlinStringLiteral>{
          type: 'line',
          value: input.value,
        },
      }
    case "numeric":
    case "nil":
    case "boolean":
      return <KotlinPrimaryExpressionLiteralConstant>{
        type: 'literalConstant',
        value: convert_literal_literalConstant(table, input),
      }
  }
}

export function convert_literal_literalConstant(table: SwiftKotlinConvertTable, input: SwiftLiteral): KotlinLiteralConstant {
  switch (input.type) {
    case "boolean":
      return <KotlinBooleanLiteral>{
        type: 'boolean',
        value: input.value,
      };
    case "nil":
      return <KotlinNullLiteral>{
        type: 'null',
      };
    case "numeric":
      return <KotlinIntegerLiteral>{
        type: 'integer',
        value: parseInt(input.value),
      };
    case "string":
      throw new Error(`swift:string-literal cannot convert to kotlin literalConstant`)
  }
}
