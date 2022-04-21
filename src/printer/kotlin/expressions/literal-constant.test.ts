import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinLiteralConstant} from "../../../syntax/kotlin/expressions/expressions";
import {kotlinLiteralConstantPrinter} from "./literal-constant";

describe('literalConstant', () => {
  const printer = kotlinLiteralConstantPrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
  };

  test('null', () => {
    const input = <KotlinLiteralConstant>{
      type: 'null',
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['null']);
  });
});
