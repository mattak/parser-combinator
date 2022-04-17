import {PrinterInput, PrinterOutput} from "../../types";
import {KotlinDeclaration, KotlinDeclarationObjectDeclaration} from "../../../syntax/kotlin";
import {kotlinObjectDeclarationPrinter} from "../class/object-declaration";

export function kotlinDeclarationPrinter(input: PrinterInput<KotlinDeclaration>): PrinterOutput {
  switch (input.data.type) {
    // case "class":
    // case "function":
    case "object":
      return kotlinObjectDeclarationPrinter({
        indentLevel: input.indentLevel,
        data: (<KotlinDeclarationObjectDeclaration>(input.data)).value,
      });
    // case "property":
    // case "typeAlias":
    default:
      throw new Error(`Not handled type: ${input.data.type}`)
  }
}
