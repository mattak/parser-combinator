import {PrinterInput, PrinterOutput} from "../../types";
import {KotlinDeclaration, KotlinObjectDeclaration} from "../../../syntax/kotlin";
import {kotlinObjectDeclarationPrinter} from "../class/object-declaration";

export function kotlinDeclarationPrinter(input: PrinterInput<KotlinDeclaration>): PrinterOutput {
  switch (input.data.type) {
    // case "class":
    // case "function":
    case "object":
      return kotlinObjectDeclarationPrinter({
        indentLevel: input.indentLevel,
        data: <KotlinObjectDeclaration>(input.data)
      });
    // case "property":
    // case "typeAlias":
    default:
      throw new Error(`Not handled type: ${input.data.type}`)
  }
}
