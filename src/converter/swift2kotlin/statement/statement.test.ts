import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {
  SwiftBreakStatement,
  SwiftImportDeclaration,
  SwiftStatementControlTransferStatement,
  SwiftStatementDeclaration
} from "../../../syntax/swift";
import {KotlinDeclaration, KotlinStatement, KotlinStatementDeclaration} from "../../../syntax/kotlin";
import {convert_statement_declarations, convert_statement_statements} from "./statement";

describe('convert_statement_declarations', () => {
  const converter = convert_statement_declarations;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'declaration': jest.fn().mockImplementation(x => [
      <KotlinDeclaration>{},
      <KotlinDeclaration>{},
    ]),
  }

  test('declaration', () => {
    const input = <SwiftStatementDeclaration>{
      type: 'declaration',
      value: <SwiftImportDeclaration>{},
    };
    const output = converter(table, input);
    expect(output).toEqual([
      {},
      {},
    ]);
  });

  test('default', () => {
    const input = <SwiftStatementControlTransferStatement>{
      type: 'control-transfer-statement',
      value: <SwiftBreakStatement>{
        type: 'break',
        label: null,
      }
    };
    expect(() => {
      const output = converter(table, input);
    }).toThrowError(Error)
  });
});

describe('convert_statement_statements', () => {
  const converter = convert_statement_statements;
  const mockCtrl = jest.fn().mockImplementation(x => <KotlinStatement>{});
  const mockDecl = jest.fn().mockImplementation(x => [<KotlinDeclaration>{}, <KotlinDeclaration>{}]);
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'declaration': mockDecl,
    'control-transfer-statement__statement': mockCtrl,
  }

  test('declaration', () => {
    const input = <SwiftStatementDeclaration>{
      type: 'declaration',
      value: <SwiftImportDeclaration>{},
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinStatement[]>([
      <KotlinStatement>{
        value: <KotlinStatementDeclaration>{
          type: 'declaration',
          value: {}
        },
      },
      <KotlinStatement>{
        value: <KotlinStatementDeclaration>{
          type: 'declaration',
          value: {}
        },
      },
    ]);
  });

  test('control-transfer-statement', () => {
    const input = <SwiftStatementControlTransferStatement>{
      type: 'control-transfer-statement',
      value: <SwiftBreakStatement>{},
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinStatement[]>([
      <KotlinStatement>{},
    ]);
  });
});
