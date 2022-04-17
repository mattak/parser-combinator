import {kotlinDeclarationPrinter} from "./declaration";
import {KotlinDeclarationObjectDeclaration, KotlinObjectDeclaration} from "../../../syntax/kotlin";
import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";

describe('declaration', () => {
  const printer = kotlinDeclarationPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'object-declaration': mock,
  };

  test('object', () => {
    const input = <KotlinDeclarationObjectDeclaration>{
      type: 'object',
      value: <KotlinObjectDeclaration>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});