import {topLevelDeclaration} from "./top-level-declaration";
import {ParserOutput} from "../../../types";
import {
  SwiftImportDeclaration,
  SwiftStatementDeclaration,
  SwiftStructDeclaration,
  SwiftTopLevelDeclaration
} from "../../../syntax/swift";

describe('top-level-declaration', () => {
  const parser = topLevelDeclaration;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTopLevelDeclaration>>({
      result: 'success',
      data: <SwiftTopLevelDeclaration>{
        statements: [],
      },
      rest: []
    });
  });

  test('import', () => {
    const input = [...'import Foundation'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTopLevelDeclaration>>({
      result: 'success',
      data: <SwiftTopLevelDeclaration>{
        statements: [
          <SwiftStatementDeclaration>{
            type: 'declaration',
            value: <SwiftImportDeclaration>{
              type: 'import',
              attributes: null,
              kind: null,
              path: 'Foundation',
            }
          }
        ]
      },
      rest: [],
    });
  });

  test('struct Me {}', () => {
    const input = [...'struct Me {}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTopLevelDeclaration>>({
      result: 'success',
      data: <SwiftTopLevelDeclaration>{
        statements: [
          <SwiftStatementDeclaration>{
            type: 'declaration',
            value: <SwiftStructDeclaration>{
              type: 'struct',
              name: "Me",
              accessLevelModifier: null,
              body: [],
            }
          }
        ]
      },
      rest: [],
    });
  });
});
