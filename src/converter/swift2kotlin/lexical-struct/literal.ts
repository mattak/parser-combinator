import {SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftLiteral} from "../../../syntax/swift";
import {
  KotlinBooleanLiteral, KotlinIntegerLiteral,
  KotlinLiteralConstant,
  KotlinNullLiteral
} from "../../../syntax/kotlin/expressions/expressions";

export function convert_literal_literalConstant(table: SwiftKotlinConvertTable, input: SwiftLiteral): KotlinLiteralConstant {
  switch(input.type) {
    case "nil":
      return <KotlinNullLiteral>{
        type: 'null',
      }
    case "boolean":
      return <KotlinBooleanLiteral>{
        type: 'boolean',
        value: input.value
      }
    case "numeric":
      return <KotlinIntegerLiteral>{
        type: 'integer',
        value: parseInt(input.value), // XXX: may raise exception
      }
    default:
      throw Error(`not implemented input.type: ${input.type}`)
  }
}
