import {kotlinSimpleIdentifierPrinter} from "./simple-identifier";
import {KotlinSimpleIdentifier} from "../../../syntax/kotlin";
import {defaultKotlinPrinterTable, PrinterOutput} from "../kotlin-printer";

describe('simple-identifier', () => {
  const printer = kotlinSimpleIdentifierPrinter;

  test('simple-identifier', () => {
    const input = <KotlinSimpleIdentifier>{
      value: 'a'
    };
    const output = printer(defaultKotlinPrinterTable, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'a'
    ]);
  });
});