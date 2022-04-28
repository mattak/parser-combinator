import * as fs from "fs";
import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../converter/swift2kotlin/swift-converter";
import {defaultKotlinPrinterTable, KotlinPrinterTable} from "../printer/kotlin/kotlin-printer";
import {parseConvertPrint} from "./parse-convert-print";

async function main() {
  if (process.argv.length <= 2) {
    console.log('usage: <filepath>')
    process.exit(1);
    return
  }

  const [, , filepath] = process.argv;

  const text = await fs.promises.readFile(filepath, 'utf8');
  const input = text.split('');
  const converterTable: SwiftKotlinConvertTable = {
    ...defaultSwiftKotlinConvertTable,
    'packageHeader': (table, input1) => 'com.example.swiftkotlin'
  };
  const printerTable: KotlinPrinterTable = {
    ...defaultKotlinPrinterTable,
  };
  const result = parseConvertPrint(input, converterTable, printerTable);
  console.log(result.join('\n'));
}

main()
  .then()
  .catch(x => {
    console.log(x);
    process.exit(1);
  });
