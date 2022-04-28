import {defaultKotlinPrinterTable, kotlinIndent, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinBlock, KotlinStatement} from "../../../syntax/kotlin";
import {kotlinBlockPrinter} from "./block";

describe('kotlinBlockPrinter', () => {
  const printer = kotlinBlockPrinter;
  const mock = jest.fn().mockImplementation(() => ['val a = 1']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'statement': mock,
  };

  test('block: empty', () => {
    const input = <KotlinBlock>{
      statements: []
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      '{',
      '}',
    ]);
  });

  test('block: single statements', () => {
    const input = <KotlinBlock>{
      statements: [<KotlinStatement>{}]
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      '{',
      kotlinIndent + 'val a = 1',
      '}',
    ]);
  });
});
