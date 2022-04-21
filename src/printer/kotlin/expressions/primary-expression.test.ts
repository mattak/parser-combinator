import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {
  KotlinLiteralConstant,
  KotlinPrimaryExpressionLiteralConstant
} from "../../../syntax/kotlin/expressions/expressions";
import {kotlinPrimaryExpressionPrinter} from "./primary-expression";

describe('kotlinPrimaryExpressionPrinter', () => {
  const printer = kotlinPrimaryExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'literal-constant': mock,
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
    expect(mock).toHaveBeenCalled();
  });
});
