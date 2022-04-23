import {kotlinDeclarationPrinter} from "./declaration";
import {
  KotlinDeclarationFunctionDeclaration,
  KotlinDeclarationObjectDeclaration,
  KotlinDeclarationPropertyDeclaration, KotlinFunctionDeclaration, KotlinFunctionValueParameter,
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
  const funMock = jest.fn().mockImplementation(() => ['fun sample() {}']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'object-declaration': objMock,
    'property-declaration': propMock,
    'function-declaration': funMock,
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

  test('function', () => {
    const input = <KotlinDeclarationFunctionDeclaration>{
      type: 'function',
      value: <KotlinFunctionDeclaration>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['fun sample() {}']);
    expect(funMock).toHaveBeenCalledTimes(1);
  });
});