import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinLiteralConstant} from "../../../syntax/kotlin";

export function kotlinLiteralConstantPrinter(table: KotlinPrinterTable, input: KotlinLiteralConstant, depth: number): PrinterOutput {
  switch (input.type) {
    case 'boolean':
      return [
        input.value.toString(),
      ]
    case 'integer':
      return [
        input.value.toString(),
      ]
    // case 'hex':
    // case 'bin':
    case 'character':
      return [
        input.value
      ]
    // case 'real':
    case 'null':
      return ['null']
    // case 'long':
    // case 'unsigned':
    default:
      throw new Error(`Not handled type: ${JSON.stringify(input, null, 2)}`);
  }
}
