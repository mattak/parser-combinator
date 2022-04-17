import {PrinterOutput} from "../../types";
import {KotlinDeclaration, KotlinDeclarationObjectDeclaration} from "../../../syntax/kotlin";
import {kotlinObjectDeclarationPrinter} from "../class/object-declaration";

export function kotlinDeclarationPrinter(input: KotlinDeclaration, depth: number): PrinterOutput {
  switch (input.type) {
    // case "class":
    // case "function":
    case "object":
      return kotlinObjectDeclarationPrinter((<KotlinDeclarationObjectDeclaration>input).value, depth);
    // case "property":
    // case "typeAlias":
    default:
      throw new Error(`Not handled type: ${input.type}`)
  }
}
