import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinStatement, KotlinStatements} from "../../../syntax/kotlin";

export function kotlinStatementsPrinter(
  table: KotlinPrinterTable,
  input: KotlinStatements,
  depth: number,
): PrinterOutput {
  return [
    ...input.flatMap(x => table['statement'](table, x, depth)),
  ]
}

export function kotlinStatementPrinter(
  table: KotlinPrinterTable,
  input: KotlinStatement,
  depth: number,
): PrinterOutput {
  switch (input.value.type) {
    case "declaration":
      return table['declaration'](table, input.value.value, depth)
    case "expression":
      return table['expression'](table, input.value.value, depth)
  }
}
