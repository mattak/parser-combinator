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
        input.label
      ]
    case "continue":
      return [
        input.label
      ]
    case "return":
      return input.expression !== null ? [
        input.label + " " + table["expression"](table, input.expression, depth)[0]
      ] : [
        input.label
      ]
    case "throw":
      return [
        'throw ' + table['expression'](table, input.expression, depth)[0]
      ]
  }
}
