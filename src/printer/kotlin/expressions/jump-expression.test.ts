import {
  KotlinExpression,
  KotlinJumpExpressionBreak,
  KotlinJumpExpressionContinue,
  KotlinJumpExpressionReturn,
  KotlinJumpExpressionThrow
} from "../../../syntax/kotlin";
import {kotlinJumpExpressionPrinter} from "./jump-expression";
import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";

describe('jump-expression', () => {
  const printer = kotlinJumpExpressionPrinter;
  const table: KotlinPrinterTable = {
    ...defaultKotlinPrinterTable,
    'expression': jest.fn().mockImplementation(() => ['e'])
  }

  test('throw', () => {
    const input = <KotlinJumpExpressionThrow>{
      type: 'throw',
      expression: <KotlinExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'throw e'
    ]);
  });

  test('return: void', () => {
    const input = <KotlinJumpExpressionReturn>{
      type: 'return',
      label: null,
      expression: null,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'return'
    ]);
  });

  test('return: 1', () => {
    const input = <KotlinJumpExpressionReturn>{
      type: 'return',
      label: 'run',
      expression: <KotlinExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'return@run e'
    ]);
  });

  test('continue', () => {
    const input = <KotlinJumpExpressionContinue>{
      type: 'continue',
      label: 'run',
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'continue@run'
    ]);
  });

  test('break', () => {
    const input = <KotlinJumpExpressionBreak>{
      type: 'break',
      label: 'forEach',
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'break@forEach'
    ]);
  });
});