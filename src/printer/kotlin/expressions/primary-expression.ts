import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinPrimaryExpression} from "../../../syntax/kotlin";

export function kotlinPrimaryExpressionPrinter(table: KotlinPrinterTable, input: KotlinPrimaryExpression, depth: number): PrinterOutput {
  switch (input.type) {
    // case 'parenthesizedExpression':
    // case 'simpleIdentifier':
    case 'literalConstant':
      return table['literal-constant'](table, input.value, depth)
    case 'stringLiteral':
      return table['string-literal'](table, input.value, depth)
    // case 'callableReference':
    // case 'functionLiteral':
    // case 'objectLiteral':
    // case 'collectionLiteral':
    // case 'thisExpression':
    // case 'superExpression':
    // case 'ifExpression':
    // case 'whenExpression':
    // case 'tryExpression':
    case 'jumpExpression':
      return table['jump-expression'](table, input.value, depth)
    case "simpleIdentifier":
      return table['simple-identifier'](table, input.value, depth)
    //   break
    default:
      throw Error(`not implemented type ${input}`)
  }
}
