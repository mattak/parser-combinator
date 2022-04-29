import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinJumpExpression} from "../../../syntax/kotlin";

export function kotlinJumpExpressionPrinter(
  table: KotlinPrinterTable,
  input: KotlinJumpExpression,
  depth: number,
): PrinterOutput {
  switch (input.type) {
    case "break":
      return [
        input.label !== null ? `break@${input.label}` : 'break'
      ]
    case "continue":
      return [
        input.label !== null ? `continue@${input.label}` : 'continue'
      ]
    case "return":
      const expression = input.expression !== null ? " " + table["expression"](table, input.expression, depth)[0] : '';
      return [
        (input.label !== null ? `return@${input.label}` : 'return') + expression
      ]
    case "throw":
      return [
        'throw ' + table['expression'](table, input.expression, depth)[0]
      ]
  }
}
