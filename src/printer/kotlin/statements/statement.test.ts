import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {
  KotlinBlock, KotlinDeclarationFunctionDeclaration, KotlinExpression,
  KotlinStatement,
  KotlinStatementDeclaration,
  KotlinStatementExpression,
  KotlinStatements
} from "../../../syntax/kotlin";
import {kotlinStatementPrinter, kotlinStatementsPrinter} from "./statement";

describe('kotlinStatementsPrinter', () => {
  const printer = kotlinStatementsPrinter;
  const mock = jest.fn().mockImplementation(() => ['val a = 1']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'statement': mock,
  };

  test('block: empty', () => {
    const input = <KotlinStatements>[
      <KotlinStatement>{},
    ];
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([
      'val a = 1'
    ]);
  });
});

describe('kotlinStatementPrinter', () => {
  const printer = kotlinStatementPrinter;
  const mockExpression = jest.fn().mockImplementation(() => ['val a = 1']);
  const mockDeclaration = jest.fn().mockImplementation(() => ['fun run() {}']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'expression': mockExpression,
    'declaration': mockDeclaration,
  };

  test('statement: declaration', () => {
    const input = <KotlinStatement>{
      value: <KotlinStatementDeclaration>{
        type: "declaration",
        value: <KotlinDeclarationFunctionDeclaration>{},
      }
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['fun run() {}']);
  });

  test('statement: expression', () => {
    const input = <KotlinStatement>{
      value: <KotlinStatementExpression>{
        type: "expression",
        value: <KotlinExpression>{},
      }
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['val a = 1']);
  });
});
