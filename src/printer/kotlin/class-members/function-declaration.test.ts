import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinFunctionDeclaration, KotlinFunctionValueParameter, KotlinParameter} from "../../../syntax/kotlin";
import {
  kotlinFunctionDeclarationPrinter,
  kotlinFunctionValueParameterPrinter,
  kotlinFunctionValueParametersPrinter, kotlinParameterPrinter
} from "./function-declaration";
import {KotlinSimpleIdentifier} from "../../../syntax/kotlin/identifiers/simple-identifier";
import {KotlinExpression} from "../../../syntax/kotlin/expressions/expressions";
import {KotlinType} from "../../../syntax/kotlin/types/type";

describe('kotlinFunctionDeclarationPrinter', () => {
  const printer = kotlinFunctionDeclarationPrinter;
  const mockWithoutParameter = jest.fn().mockImplementation(() => ['()']);
  const mockWithParameter1 = jest.fn().mockImplementation(() => ['(a: Int)']);

  test('plain', () => {
    const input = <KotlinFunctionDeclaration>{
      name: <KotlinSimpleIdentifier>{value: "run"},
      parameters: [],
      functionBody: null,
    };
    const table = <KotlinPrinterTable>{
      ...defaultKotlinPrinterTable,
      'function-value-parameters': mockWithoutParameter,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'fun run() {',
      '}',
    ]);
    expect(mockWithoutParameter).toHaveBeenCalledTimes(1);
  });

  test('with parameter', () => {
    const input = <KotlinFunctionDeclaration>{
      name: <KotlinSimpleIdentifier>{value: "run"},
      parameters: [<KotlinFunctionValueParameter>{}],
      functionBody: null,
    };
    const table = <KotlinPrinterTable>{
      ...defaultKotlinPrinterTable,
      'function-value-parameters': mockWithParameter1,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'fun run(a: Int) {',
      '}',
    ]);
    expect(mockWithParameter1).toHaveBeenCalledTimes(1);
  });
});

describe('kotlinFunctionValueParametersPrinter', () => {
  const printer = kotlinFunctionValueParametersPrinter;
  const mock = jest.fn().mockImplementation(() => ['a: Int']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'function-value-parameter': mock,
  };

  test('empty', () => {
    const input = <KotlinFunctionValueParameter>{
      parameter: <KotlinParameter>{},
      expression: null,
    };
    const output = printer(table, [], 0);
    expect(output).toEqual<PrinterOutput>([
      '()'
    ]);
    expect(mock).toHaveBeenCalledTimes(0);
  });

  test('empty', () => {
    const input = <KotlinFunctionValueParameter>{
      parameter: <KotlinParameter>{},
      expression: null,
    };
    const output = printer(table, [input], 0);
    expect(output).toEqual<PrinterOutput>([
      '(a: Int)'
    ]);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});

describe('kotlinFunctionValueParameterPrinter', () => {
  const printer = kotlinFunctionValueParameterPrinter;
  const mockParameter = jest.fn().mockImplementation(() => ['a: Int']);
  const mockExpression = jest.fn().mockImplementation(() => ['1']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'parameter': mockParameter,
    'expression': mockExpression,
  };

  test('without expression', () => {
    const input = <KotlinFunctionValueParameter>{
      parameter: <KotlinParameter>{},
      expression: null,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'a: Int',
    ]);
    expect(mockParameter).toHaveBeenCalledTimes(1);
  });

  test('with expression', () => {
    const input = <KotlinFunctionValueParameter>{
      parameter: <KotlinParameter>{},
      expression: <KotlinExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'a: Int = 1',
    ]);
    expect(mockExpression).toHaveBeenCalledTimes(1);
  });
});

describe('kotlinParameterPrinter', () => {
  const printer = kotlinParameterPrinter;
  const mockType = jest.fn().mockImplementation(() => ['Type']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'type': mockType,
  };

  test('default', () => {
    const input = <KotlinParameter>{
      key: <KotlinSimpleIdentifier>{value: 'a'},
      type: <KotlinType>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'a: Type',
    ]);
    expect(mockType).toHaveBeenCalledTimes(1);
  });
});
