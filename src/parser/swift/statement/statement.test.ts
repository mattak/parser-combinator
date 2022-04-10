import {ParserOutput} from "../../../types";
import {statement} from "./statement";
import {SwiftStatementDeclaration} from "../../../syntax/swift/statement/statement";
import {SwiftImportDeclaration} from "../../../syntax/swift/declaration/import-declaration";

describe('statement', () => {
  const parser = statement;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: 'fail',
    });
  });

  test('declaration', () => {
    const input = [...'import Foundation'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStatementDeclaration>>({
      result: 'success',
      data: <SwiftStatementDeclaration>{
        type: 'declaration',
        value: <SwiftImportDeclaration>{
          type: 'import',
          attributes: null,
          kind: null,
          path: "Foundation",
        },
      },
      rest: [],
    });
  });
});

