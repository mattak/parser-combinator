import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinPrimaryExpression, KotlinSimpleIdentifier} from "../../../syntax/kotlin";

export function kotlinSimpleIdentifierPrinter(
  table: KotlinPrinterTable,
  input: KotlinSimpleIdentifier,
  depth: number,
): PrinterOutput {
  return [
    input.value
  ]
}
