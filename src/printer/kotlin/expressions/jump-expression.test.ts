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
    'expression': jest.fn().mockImplementation(() => ['1'])
  }

  test('throw', () => {
    const input = <KotlinJumpExpressionThrow>{
      type: 'throw',
      expression: <KotlinExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'throw 1'
    ]);
  });

  test('return: void', () => {
    const input = <KotlinJumpExpressionReturn>{
      type: 'return',
      label: 'return',
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
      label: 'return@run',
      expression: <KotlinExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'return@run 1'
    ]);
  });

  test('continue', () => {
    const input = <KotlinJumpExpressionContinue>{
      type: 'continue',
      label: 'continue@run',
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'continue@run'
    ]);
  });

  test('break', () => {
    const input = <KotlinJumpExpressionBreak>{
      type: 'break',
      label: 'break@forEach',
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'break@forEach'
    ]);
  });
});