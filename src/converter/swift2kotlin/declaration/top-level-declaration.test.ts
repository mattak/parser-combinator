import {convert_topLevelDeclaration_file} from "./top-level-declaration";
import {
  SwiftImportDeclaration,
  SwiftStatement,
  SwiftStatementDeclaration,
  SwiftStructDeclaration,
  SwiftTopLevelDeclaration
} from "../../../syntax/swift";
import {
  KotlinClassBody, KotlinDeclaration,
  KotlinFile, KotlinImportHeader,
  KotlinImportList,
  KotlinModifiers,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable, swiftKotlinDefaultConvertTable} from "../swift-converter";

describe('topLevelDeclarationConverter', () => {
  const converter = convert_topLevelDeclaration_file;
  const table = <SwiftKotlinConvertTable>{
    ...swiftKotlinDefaultConvertTable,
    'statement': jest.fn().mockImplementation(x => {
      return {}
    }),
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
