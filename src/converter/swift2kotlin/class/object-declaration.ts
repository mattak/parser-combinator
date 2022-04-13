import {PrinterInput, PrinterOutput} from "../../../printer/types";
import {KotlinObjectDeclaration} from "../../../syntax/kotlin";

export function kotlinObjectDeclarationPrinter(input: PrinterInput<KotlinObjectDeclaration>): PrinterOutput {
  return [
    `object ${input.data.name} {`,
    // FIXME: print body
    `}`,
  ];
}
