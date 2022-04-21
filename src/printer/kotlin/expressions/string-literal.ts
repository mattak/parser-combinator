import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinStringLiteral} from "../../../syntax/kotlin/expressions/string-literal";

export function kotlinStringLiteralPrinter(table: KotlinPrinterTable, input: KotlinStringLiteral, depth: number): PrinterOutput {
  switch (input.type) {
    case "line":
      return [`"${input.value}"`]
    case "multiLine":
      return [`"""${input.value}"""`]
  }
}
