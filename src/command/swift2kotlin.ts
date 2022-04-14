import * as fs from "fs";
import {topLevelDeclaration} from "../parser/swift/declaration/top-level-declaration";
import {topLevelDeclarationConverter} from "../converter/swift2kotlin/declaration/top-level-declaration";
import {KotlinFile} from "../syntax/kotlin";
import {kotlinFilePrinter} from "../printer/kotlin/general/file";
import * as util from "util";

async function main() {
  if (process.argv.length <= 2) {
    console.log('usage: <filepath>')
    process.exit(1);
    return
  }

  const [, , filepath] = process.argv;

  const text = await fs.promises.readFile(filepath, 'utf8');
  const input = text.split('');
  const parsed = topLevelDeclaration(input);
  console.log(`parsed: ${util.inspect(parsed)}`);

  if (parsed.result === 'fail') {
    console.error('parse failed');
    process.exit(1);
    return;
  }

  const kotlin = topLevelDeclarationConverter(parsed.data, <KotlinFile>{
    packageHeader: 'com.example'
  });

  const result = kotlinFilePrinter({indentLevel: 0, data: kotlin});
  console.log(result.join('\n'));
}

main()
  .then()
  .catch(x => {
    console.log(x);
    process.exit(1);
  });
