import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {kotlinStringLiteralPrinter} from "./string-literal";
import {KotlinLineStringLiteral} from "../../../syntax/kotlin/expressions/string-literal";

describe('kotlinStringLiteralPrinter', () => {
  const printer = kotlinStringLiteralPrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
  };

  test('stringLiteral', () => {
    const input = <KotlinLineStringLiteral>{
      type: 'line',
      value: "hello",
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['"hello"']);
  });
});
