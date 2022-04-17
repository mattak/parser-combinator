import {KotlinFile} from "../../../syntax/kotlin";
import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";

export function kotlinFilePrinter(table: KotlinPrinterTable, input: KotlinFile, depth: number): PrinterOutput {
  const body = input.topLevelObjects.map(x => table['declaration'](table, x, 0));

  return [
    `package ${input.packageHeader}`,
    '',
    ...input.importList.importHeaders.map(x => x.path),
    '',
    ...body.flat()
  ];
}
