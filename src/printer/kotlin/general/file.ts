import {KotlinFile, KotlinImportList} from "../../../syntax/kotlin";
import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";

export function kotlinFilePrinter(table: KotlinPrinterTable, input: KotlinFile, depth: number): PrinterOutput {
  const body = input.topLevelObjects.map(x => table['declaration'](table, x, 0));
  const packageHeader = input.packageHeader !== "" ? [`package ${input.packageHeader}`, ''] : [];
  const importList = table['import-list'](table, input.importList, depth)
  if (importList.length > 0) importList.push('');

  return [
    ...packageHeader,
    ...importList,
    ...body.flat()
  ];
}

export function kotlinImportListPrinter(table: KotlinPrinterTable, input: KotlinImportList, depth: number): PrinterOutput {
  return input.importHeaders.map(x => `import ${x.path}`);
}