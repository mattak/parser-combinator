import {kotlinDeclarationPrinter} from "./declaration";
import {
  KotlinDeclarationObjectDeclaration,
  KotlinDeclarationPropertyDeclaration,
  KotlinObjectDeclaration,
  KotlinPropertyDeclaration
} from "../../../syntax/kotlin";
import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";

describe('declaration', () => {
  const printer = kotlinDeclarationPrinter;
  const objMock = jest.fn().mockImplementation(() => [
    'object Entity {',
    '}',
  ]);
  const propMock = jest.fn().mockImplementation(() => ['val value']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'object-declaration': objMock,
    'property-declaration': propMock,
  };

  test('object', () => {
    const input = <KotlinDeclarationObjectDeclaration>{
      type: 'object',
      value: <KotlinObjectDeclaration>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['object Entity {', '}']);
    expect(objMock).toHaveBeenCalledTimes(1);
  });

  test('property', () => {
    const input = <KotlinDeclarationPropertyDeclaration>{
      type: 'property',
      value: <KotlinPropertyDeclaration>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['val value']);
    expect(objMock).toHaveBeenCalledTimes(1);
  });
});