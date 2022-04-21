import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {
  KotlinPrimaryExpression,
  KotlinPrimaryExpressionLiteralConstant, KotlinPrimaryExpressionStringLiteral
} from "../../../syntax/kotlin/expressions/expressions";

export function kotlinPrimaryExpressionPrinter(table: KotlinPrinterTable, input: KotlinPrimaryExpression, depth: number): PrinterOutput {
  switch (input.type) {
    // case 'parenthesizedExpression':
    // case 'simpleIdentifier':
    case 'literalConstant':
      return table['literal-constant'](table, (<KotlinPrimaryExpressionLiteralConstant>input).value, depth)
    case 'stringLiteral':
      return table['string-literal'](table, (<KotlinPrimaryExpressionStringLiteral>input).value, depth)
    // case 'callableReference':
    // case 'functionLiteral':
    // case 'objectLiteral':
    // case 'collectionLiteral':
    // case 'thisExpression':
    // case 'superExpression':
    // case 'ifExpression':
    // case 'whenExpression':
    // case 'tryExpression':
    // case 'jumpExpression':
    //   break
    default:
      throw Error(`not implemented type ${input.type}`)
  }
}
