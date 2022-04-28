import {kotlinIndent, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinBlock} from "../../../syntax/kotlin";

export function kotlinBlockPrinter(
  table: KotlinPrinterTable,
  input: KotlinBlock,
  depth: number,
): PrinterOutput {
  return [
    '{',
    ...table['statements'](table, input.statements, depth).map(x => kotlinIndent + x),
    '}',
  ]
}
