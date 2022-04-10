import {ParserOutput} from "../../../types";
import {declaration, SwiftDeclaration} from "./declaration";
import {SwiftConstantDeclaration} from "./constant-declaration";
import {SwiftImportDeclaration} from "../../../syntax/swift/declaration/import-declaration";

describe('declaration', () => {
  const parser = declaration;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<unknown>>({
      result: 'fail',
    });
  });

  test('Input let _', () => {
    const input = [...'let _'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<unknown>>({
      result: 'success',
      data: <SwiftConstantDeclaration>{
        type: 'constant',
        patternInitializers: [
          {
            pattern: {
              type: 'wildcard',
              value: '_',
            },
            initializer: null,
          }
        ]
      },
      rest: [],
    });
  });

  test('import Foundation', () => {
    const input = [...'import Foundation'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftDeclaration>>({
      result: 'success',
      data: <SwiftImportDeclaration>{
        type: 'import',
        attributes: null,
        kind: null,
        path: 'Foundation',
      },
      rest: [],
    });
  });
});