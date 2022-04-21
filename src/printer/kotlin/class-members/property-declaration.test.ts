import {kotlinPropertyDeclarationPrinter, kotlinVariableDeclarationPrinter} from "./property-declaration";
import {KotlinExpression} from "../../../syntax/kotlin/expressions/expressions";
import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinPropertyDeclaration, KotlinVariableDeclaration} from "../../../syntax/kotlin";

describe('kotlinPropertyDeclarationPrinter', () => {
  const printer = kotlinPropertyDeclarationPrinter;
  const varMock = jest.fn().mockImplementation(() => ['value']);
  const exMock = jest.fn().mockImplementation(() => ['null']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'variable-declaration': varMock,
    'expression': exMock,
  };

  beforeEach(() => {
    varMock.mockClear();
    exMock.mockClear();
  })

  test('null expression', () => {
    const input = <KotlinPropertyDeclaration>{
      type: 'val',
      variableDeclaration: <KotlinVariableDeclaration>{},
      expression: null,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['val value']);
    expect(varMock).toHaveBeenCalledTimes(1);
  });

  test('with expression', () => {
    const input = <KotlinPropertyDeclaration>{
      type: 'var',
      variableDeclaration: <KotlinVariableDeclaration>{},
      expression: <KotlinExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['var value = null']);
    expect(varMock).toHaveBeenCalledTimes(1);
    expect(exMock).toHaveBeenCalledTimes(1);
  });
});

describe('kotlinVariableDeclarationPrinter', () => {
  const printer = kotlinVariableDeclarationPrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
  };

  test('default', () => {
    const input = <KotlinVariableDeclaration>{
      name: 'value',
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['value']);
  });
});

