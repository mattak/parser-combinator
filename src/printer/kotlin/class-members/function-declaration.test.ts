import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {
  KotlinBlock,
  KotlinExpression,
  KotlinFunctionBodyBlock,
  KotlinFunctionBodyExpression,
  KotlinFunctionDeclaration, KotlinFunctionModifier,
  KotlinFunctionValueParameter, KotlinModifier, KotlinModifiers,
  KotlinParameter,
  KotlinSimpleIdentifier,
  KotlinStatement,
  KotlinType,
  KotlinTypeReference,
  KotlinUserType
} from "../../../syntax/kotlin";
import {
  kotlinFunctionBodyPrinter,
  kotlinFunctionDeclarationPrinter,
  kotlinFunctionValueParameterPrinter,
  kotlinFunctionValueParametersPrinter,
  kotlinParameterPrinter
} from "./function-declaration";

describe('kotlinFunctionDeclarationPrinter', () => {
  const printer = kotlinFunctionDeclarationPrinter;
  const mockWithoutParameter = jest.fn().mockImplementation(() => ['()']);
  const mockWithParameter1 = jest.fn().mockImplementation(() => ['(a: Int)']);
  const mockWithType = jest.fn().mockImplementation(() => ['Sample']);
  const mockWithBody = jest.fn().mockImplementation(() => ['{', 'val a = 1', '}']);

  test('plain', () => {
    const input = <KotlinFunctionDeclaration>{
      modifiers: <KotlinModifiers>[],
      name: <KotlinSimpleIdentifier>{value: "run"},
      parameters: [],
      returnType: null,
      body: null,
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
      modifiers: <KotlinModifiers>[],
      name: <KotlinSimpleIdentifier>{value: "run"},
      parameters: [<KotlinFunctionValueParameter>{}],
      returnType: null,
      body: null,
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

  test('with returnType', () => {
    const input = <KotlinFunctionDeclaration>{
      modifiers: <KotlinModifiers>[],
      name: <KotlinSimpleIdentifier>{value: "run"},
      parameters: [],
      returnType: <KotlinType>{
        value: <KotlinTypeReference>{
          type: 'typeReference',
          value: <KotlinUserType>{
            type: 'userType',
            name: 'Sample',
          },
        },
      },
      body: null,
    };
    const table = <KotlinPrinterTable>{
      ...defaultKotlinPrinterTable,
      'function-value-parameters': mockWithoutParameter,
      'type': mockWithType,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'fun run(): Sample {',
      '}',
    ]);
    expect(mockWithType).toHaveBeenCalledTimes(1);
  });

  test('with body', () => {
    const input = <KotlinFunctionDeclaration>{
      modifiers: <KotlinModifiers>[],
      name: <KotlinSimpleIdentifier>{value: "run"},
      parameters: [<KotlinFunctionValueParameter>{}],
      returnType: null,
      body: <KotlinFunctionBodyBlock>{
        type: 'block',
        value: <KotlinBlock>{},
      },
    };
    const table = <KotlinPrinterTable>{
      ...defaultKotlinPrinterTable,
      'function-value-parameters': mockWithoutParameter,
      'function-body': mockWithBody,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'fun run() {',
      'val a = 1',
      '}',
    ]);
    expect(mockWithBody).toHaveBeenCalledTimes(1);
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

describe('kotlinFunctionBodyPrinter', () => {
  const printer = kotlinFunctionBodyPrinter;
  const mockBlock = jest.fn().mockImplementation(() => ['val a = 1']);
  const mockExpression = jest.fn().mockImplementation(() => ['1']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'block': mockBlock,
    'expression': mockExpression,
  };

  test('block', () => {
    const input = <KotlinFunctionBodyBlock>{
      type: 'block',
      value: <KotlinBlock>{
        statements: [
          <KotlinStatement>{},
        ],
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'val a = 1',
    ]);
  });

  test('expression', () => {
    const input = <KotlinFunctionBodyExpression>{
      type: 'expression',
      value: <KotlinExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      '= 1',
    ]);
  });
});
