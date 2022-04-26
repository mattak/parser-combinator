import {ParserOutput} from "../../../types";
import {codeBlock} from "./code-block";
import {
  SwiftConstantDeclaration,
  SwiftPattern, SwiftPatternIdentifier,
  SwiftPatternInitializer,
  SwiftStatement,
  SwiftStatementDeclaration
} from "../../../syntax/swift";

describe('code-block', () => {
  const parser = codeBlock;

  test('Empty', () => {
    const input = [...''] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStatement[]>>({
      result: 'fail',
    });
  });

  test('Input: {}', () => {
    const input = [...'{}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStatement[]>>({
      result: 'success',
      data: [],
      rest: [],
    });
  });

  test('Input: { let a }', () => {
    const input = [...'{ let a }'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStatement[]>>({
      result: 'success',
      data: [
        <SwiftStatementDeclaration>{
          type: "declaration",
          value: <SwiftConstantDeclaration>{
            type: 'constant',
            patternInitializers: [
              <SwiftPatternInitializer>{
                pattern: <SwiftPattern>{
                  type: 'identifier',
                  value: "a",
                },
                initializer: null,
              },
            ],
          }
        },
      ],
      rest: [],
    });
  });

  test('Input: { let a\n let b }', () => {
    const input = [...'{ let a\n let b }'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftStatement[]>>({
      result: 'success',
      data: [
        <SwiftStatementDeclaration>{
          type: "declaration",
          value: <SwiftConstantDeclaration>{
            type: 'constant',
            patternInitializers: [
              <SwiftPatternInitializer>{
                pattern: <SwiftPatternIdentifier>{
                  type: 'identifier',
                  value: "a",
                },
                initializer: null,
              },
            ],
          }
        },
        <SwiftStatementDeclaration>{
          type: "declaration",
          value: <SwiftConstantDeclaration>{
            type: 'constant',
            patternInitializers: [
              <SwiftPatternInitializer>{
                pattern: <SwiftPatternIdentifier>{
                  type: 'identifier',
                  value: "b",
                },
                initializer: null,
              },
            ],
          }
        },
      ],
      rest: [],
    });
  });
});
