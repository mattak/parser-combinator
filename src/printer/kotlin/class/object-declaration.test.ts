import {kotlinObjectDeclarationPrinter} from "./object-declaration";
import {KotlinClassBody, KotlinObjectDeclaration} from "../../../syntax/kotlin";
import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";

describe('kotlinObjectDeclarationPrinter', () => {
  const printer = kotlinObjectDeclarationPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'class-body': mock,
  };

  test('Empty', () => {
    const input = <KotlinObjectDeclaration>{
      type: 'object',
      modifiers: {modifiers: []},
      name: "MyStruct",
      body: <KotlinClassBody>{
        members: [],
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'object MyStruct {',
      '}',
    ]);
  });
});
