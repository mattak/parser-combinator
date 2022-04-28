import {ParserOutput} from "../../../types";
import {statement} from "./statement";
import {
  SwiftFunctionDeclaration,
  SwiftFunctionSignature,
  SwiftImportDeclaration,
  SwiftStatementDeclaration
} from "../../../syntax/swift";

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

  test('declaration:functionDeclaration', () => {
    const input = [...'func run(){}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStatementDeclaration>>({
      result: 'success',
      data: <SwiftStatementDeclaration>{
        type: 'declaration',
        value: <SwiftFunctionDeclaration>{
          type: 'function',
          head: {},
          name: 'run',
          signature: <SwiftFunctionSignature>{
            parameters: [],
            isAsync: false,
            isThrows: false,
            result: null,
          },
          genericWhere: null,
          body: null,
        },
      },
      rest: [],
    });
  });
});
