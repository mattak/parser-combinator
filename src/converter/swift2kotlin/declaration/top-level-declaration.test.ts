import {convert_topLevelDeclaration_file} from "./top-level-declaration";
import {
  SwiftImportDeclaration,
  SwiftStatement,
  SwiftStatementDeclaration,
  SwiftTopLevelDeclaration
} from "../../../syntax/swift";
import {KotlinDeclaration, KotlinFile, KotlinImportHeader, KotlinImportList} from "../../../syntax/kotlin";
import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";

describe('topLevelDeclarationConverter', () => {
  const converter = convert_topLevelDeclaration_file;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'statement__declarations': jest.fn().mockImplementation(x => [{}]),
    'packageHeader': jest.fn().mockImplementation(() => 'com.example.test'),
  }

  test('Empty', () => {
    const input = <SwiftTopLevelDeclaration>{
      statements: <SwiftStatement[]>[],
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFile>({
      packageHeader: 'com.example.test',
      importList: <KotlinImportList>{importHeaders: []},
      topLevelObjects: [],
    });
  });

  test('import', () => {
    const input = <SwiftTopLevelDeclaration>{
      statements: <SwiftStatement[]>[
        <SwiftStatementDeclaration>{
          type: 'declaration',
          value: <SwiftImportDeclaration>{
            type: 'import',
            attributes: null,
            kind: null,
            path: 'Foundation',
          }
        }
      ],
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFile>({
      packageHeader: 'com.example.test',
      importList: <KotlinImportList>{
        importHeaders: [
          <KotlinImportHeader>{
            path: 'Foundation',
          }
        ]
      },
      topLevelObjects: [
        <KotlinDeclaration>{},
      ],
    });
  });
});
