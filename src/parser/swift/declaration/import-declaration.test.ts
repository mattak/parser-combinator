import {importDeclaration} from "./import-declaration";
import {ParserOutput} from "../../../types";
import {SwiftImportDeclaration} from "../../../syntax/swift";

describe('importDeclaration', () => {
  const parser = importDeclaration;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftImportDeclaration>>({
      result: 'fail',
    })
  });

  test('path', () => {
    const input = [...'import Foundation'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftImportDeclaration>>({
      result: 'success',
      data: <SwiftImportDeclaration>{
        type: 'import',
        attributes: null,
        kind: null,
        path: 'Foundation',
      },
      rest: [],
    })
  });
});
