import {SwiftKotlinConvertTable} from "../converter/swift2kotlin/swift-converter";
import {KotlinPrinterTable} from "../printer/kotlin/kotlin-printer";
import {topLevelDeclaration} from "../parser/swift/declaration/top-level-declaration";
import {convert_topLevelDeclaration_file} from "../converter/swift2kotlin/declaration/top-level-declaration";
import {kotlinFilePrinter} from "../printer/kotlin/general/file";

export function parseConvertPrint(input: string[], converterTable: SwiftKotlinConvertTable, printerTable: KotlinPrinterTable): string[] {
  const parsed = topLevelDeclaration(input);
  if (parsed.result === 'fail') {
    throw Error('parse failed')
  }
  // console.log('parsed:');
  // console.log(JSON.stringify(parsed.data, null, 2))

  // convert
  const converted = convert_topLevelDeclaration_file(converterTable, parsed.data);
  // console.log('converted:');
  // console.log(JSON.stringify(converted, null, 2))

  // printer
  return kotlinFilePrinter(printerTable, converted, 0);
}

