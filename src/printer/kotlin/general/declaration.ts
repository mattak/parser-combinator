import {
  KotlinDeclaration,
  KotlinDeclarationObjectDeclaration,
  KotlinDeclarationPropertyDeclaration
} from "../../../syntax/kotlin";
import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";

export function kotlinDeclarationPrinter(table: KotlinPrinterTable, input: KotlinDeclaration, depth: number): PrinterOutput {
  switch (input.type) {
    // case "class":
    // case "function":
    case "object":
      return table['object-declaration'](table, (<KotlinDeclarationObjectDeclaration>input).value, 0)
    case "property":
      return table['property-declaration'](table, (<KotlinDeclarationPropertyDeclaration>input).value, depth)
    // case "typeAlias":
    default:
      throw new Error(`Not handled type: ${input.type}`)
  }
}
