import {KotlinDeclaration} from "../../../syntax/kotlin";
import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import * as util from "util";

export function kotlinDeclarationPrinter(table: KotlinPrinterTable, input: KotlinDeclaration, depth: number): PrinterOutput {
  switch (input.type) {
    // case "class":
    case "function":
      return table['function-declaration'](table, input.value, 0)
    case "object":
      return table['object-declaration'](table, input.value, 0)
    case "property":
      return table['property-declaration'](table, input.value, depth)
    // case "typeAlias":
    default:
      throw new Error(`Not handled type: ${util.inspect(input, false, null)}`)
  }
}
