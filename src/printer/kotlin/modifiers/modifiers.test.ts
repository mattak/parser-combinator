import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinModifier, KotlinModifiers} from "../../../syntax/kotlin";
import {kotlinModifierPrinter, kotlinModifiersPrinter} from "./modifiers";

describe('kotlinModifierPrinter', () => {
  const printer = kotlinModifierPrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
  };

  test('private', () => {
    const input: KotlinModifier = 'private';
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['private']);
  });
});

describe('kotlinModifiersPrinter', () => {
  const printer = kotlinModifiersPrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
  };

  test('empty', () => {
    const input: KotlinModifiers = [];
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
  });

  test('private open', () => {
    const input: KotlinModifiers = ['private', 'open'];
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['private open']);
  });
});
