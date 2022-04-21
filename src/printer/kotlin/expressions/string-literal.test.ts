import {kotlinPrimaryExpressionPrinter} from "./primary-expression";
import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {
  KotlinLiteralConstant,
  KotlinPrimaryExpressionLiteralConstant
} from "../../../syntax/kotlin/expressions/expressions";
import {kotlinStringLiteralPrinter} from "./string-literal";
import {KotlinLineStringLiteral, KotlinStringLiteral} from "../../../syntax/kotlin/expressions/string-literal";

describe('kotlinStringLiteralPrinter', () => {
  const printer = kotlinStringLiteralPrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
  };

  test('stringLiteral', () => {
    const input = <KotlinLineStringLiteral>{
      type: 'line',
      value: "hello",
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['"hello"']);
  });
});
