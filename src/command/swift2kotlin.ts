import * as fs from "fs";
import {topLevelDeclaration} from "../parser/swift/declaration/top-level-declaration";
import {convert_topLevelDeclaration_file} from "../converter/swift2kotlin/declaration/top-level-declaration";
import {kotlinFilePrinter} from "../printer/kotlin/general/file";
import * as util from "util";
import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../converter/swift2kotlin/swift-converter";
import {defaultKotlinPrinterTable, KotlinPrinterTable} from "../printer/kotlin/kotlin-printer";

async function main() {
  if (process.argv.length <= 2) {
    console.log('usage: <filepath>')
    process.exit(1);
    return
  }

  const [, , filepath] = process.argv;

  const text = await fs.promises.readFile(filepath, 'utf8');
  console.log('input:');
  console.log(text);

  // parse
  const input = text.split('');
  const parsed = topLevelDeclaration(input);

  if (parsed.result === 'fail') {
    console.error('parse failed');
    process.exit(1);
    return;
  }
  console.log('parsed:');
  console.log(JSON.stringify(parsed.data, null, 2))

  // convert
  const converterTable: SwiftKotlinConvertTable = {
    ...defaultSwiftKotlinConvertTable,
    'packageHeader': (table, input1) => 'com.example.swiftkotlin'
  };
  const converted = convert_topLevelDeclaration_file(converterTable, parsed.data);
  console.log('converted:');
  console.log(JSON.stringify(converted, null, 2))

  // printer
  const printerTable: KotlinPrinterTable = {
    ...defaultKotlinPrinterTable,
  };
  const result = kotlinFilePrinter(printerTable, converted, 0);
  console.log(result.join('\n'));
}

main()
  .then()
  .catch(x => {
    console.log(x);
    process.exit(1);
  });
