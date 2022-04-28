import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {
  KotlinJumpExpression,
  KotlinLineStringLiteral,
  KotlinLiteralConstant, KotlinPrimaryExpressionJumpExpression,
  KotlinPrimaryExpressionLiteralConstant,
  KotlinPrimaryExpressionSimpleIdentifier,
  KotlinPrimaryExpressionStringLiteral,
  KotlinSimpleIdentifier
} from "../../../syntax/kotlin";
import {kotlinPrimaryExpressionPrinter} from "./primary-expression";

describe('kotlinPrimaryExpressionPrinter', () => {
  const printer = kotlinPrimaryExpressionPrinter;
  const mockLiteralConstant = jest.fn().mockImplementation(() => []);
  const mockString = jest.fn().mockImplementation(() => ['"a"']);
  const mockSimpleIdentifier = jest.fn().mockImplementation(() => ['a']);
  const mockJumpExpression = jest.fn().mockImplementation(() => ['return 1']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'literal-constant': mockLiteralConstant,
    'string-literal': mockString,
    'simple-identifier': mockSimpleIdentifier,
    'jump-expression': mockJumpExpression,
  };

  test('literalConstant', () => {
    const input = <KotlinPrimaryExpressionLiteralConstant>{
      type: 'literalConstant',
      value: <KotlinLiteralConstant>{
        type: 'null',
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mockLiteralConstant).toHaveBeenCalled();
  });

  test('literalConstant', () => {
    const input = <KotlinPrimaryExpressionLiteralConstant>{
      type: 'literalConstant',
      value: <KotlinLiteralConstant>{
        type: 'null',
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mockLiteralConstant).toHaveBeenCalled();
  });

  test('stringLiteral', () => {
    const input = <KotlinPrimaryExpressionStringLiteral>{
      type: 'stringLiteral',
      value: <KotlinLineStringLiteral>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(["\"a\""]);
    expect(mockString).toHaveBeenCalled();
  });

  test('simpleIdentifier', () => {
    const input = <KotlinPrimaryExpressionSimpleIdentifier>{
      type: 'simpleIdentifier',
      value: <KotlinSimpleIdentifier>{value: 'a'},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(["a"]);
    expect(mockSimpleIdentifier).toHaveBeenCalled();
  });

  test('jumpExpression', () => {
    const input = <KotlinPrimaryExpressionJumpExpression>{
      type: 'jumpExpression',
      value: <KotlinJumpExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(["return 1"]);
    expect(mockJumpExpression).toHaveBeenCalled();
  });
});
