import {
  functionDeclaration,
  functionHead,
  functionResult,
  functionSignature,
  parameter,
  parameterClause,
  parameterList
} from "./function-declaration";
import {
  SwiftConstantDeclaration,
  SwiftFunctionBody,
  SwiftFunctionDeclaration,
  SwiftFunctionHead,
  SwiftFunctionResult,
  SwiftFunctionSignature,
  SwiftParameter,
  SwiftParameterClause,
  SwiftParameterList,
  SwiftPatternIdentifier,
  SwiftPatternInitializer,
  SwiftStatementDeclaration,
  SwiftType,
  SwiftTypeAnnotation,
  SwiftTypeIdentifier
} from "../../../syntax/swift";
import {ParserOutput} from "../../../types";

describe('head', () => {
  const parser = functionHead;

  test('empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameter>>({
      result: 'fail',
    });
  });

  test('Input: func', () => {
    const input = [...'func'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionHead>>({
      result: 'success',
      data: <SwiftFunctionHead>{
        modifiers: [],
      },
      rest: [],
    });
  });

  test('Input: static func', () => {
    const input = [...'static func'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionHead>>({
      result: 'success',
      data: <SwiftFunctionHead>{
        modifiers: [
          'static'
        ],
      },
      rest: [],
    });
  });
});

describe('parameter', () => {
  const parser = parameter;

  test('empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameter>>({
      result: 'fail',
    });
  });

  test('Input: param1: Sample', () => {
    const input = [...'param1: Sample'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameter>>({
      result: 'success',
      data: <SwiftParameter>{
        externalName: null,
        localName: 'param1',
        type: <SwiftTypeAnnotation>{
          attributes: null,
          isInout: false,
          type: <SwiftType>{
            type: 'type-identifier',
            name: 'Sample',
            genericArguments: [],
            innerType: null,
          },
        },
        defaultArgument: null,
      },
      rest: [],
    });
  });

  test('Input: extParam1 param1: Sample', () => {
    const input = [...'extParam1 param1: Sample'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameter>>({
      result: 'success',
      data: <SwiftParameter>{
        externalName: 'extParam1',
        localName: 'param1',
        type: <SwiftTypeAnnotation>{
          attributes: null,
          isInout: false,
          type: <SwiftType>{
            type: 'type-identifier',
            name: 'Sample',
            genericArguments: [],
            innerType: null,
          },
        },
        defaultArgument: null,
      },
      rest: [],
    });
  });
});

describe('parameterList', () => {
  const parser = parameterList;

  test('empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameterList>>({
      result: 'success',
      data: <SwiftParameter[]>[],
      rest: [],
    });
  });

  test('Input: a: A', () => {
    const input = [...'a: A'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameterList>>({
      result: 'success',
      data: <SwiftParameter[]>[
        <SwiftParameter>{
          externalName: null,
          localName: 'a',
          type: <SwiftTypeAnnotation>{
            attributes: null,
            isInout: false,
            type: <SwiftType>{
              type: 'type-identifier',
              name: 'A',
              genericArguments: [],
              innerType: null,
            },
          },
          defaultArgument: null,
        },
      ],
      rest: [],
    });
  });

  test('Input: a: A, b: B', () => {
    const input = [...'a: A, b: B'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameterList>>({
      result: 'success',
      data: <SwiftParameter[]>[
        <SwiftParameter>{
          externalName: null,
          localName: 'a',
          type: <SwiftTypeAnnotation>{
            attributes: null,
            isInout: false,
            type: <SwiftType>{
              type: 'type-identifier',
              name: 'A',
              genericArguments: [],
              innerType: null,
            },
          },
          defaultArgument: null,
        },
        <SwiftParameter>{
          externalName: null,
          localName: 'b',
          type: <SwiftTypeAnnotation>{
            attributes: null,
            isInout: false,
            type: <SwiftType>{
              type: 'type-identifier',
              name: 'B',
              genericArguments: [],
              innerType: null,
            },
          },
          defaultArgument: null,
        },
      ],
      rest: [],
    });
  });
});

describe('parameterClause', () => {
  const parser = parameterClause;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameterList>>({
      result: 'fail',
    });
  });

  test('Input: ()', () => {
    const input = [...'()'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameterClause>>({
      result: 'success',
      data: <SwiftParameterList>[],
      rest: [],
    });
  });

  test('Input: (param: Param)', () => {
    const input = [...'(param: Param)'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameterClause>>({
      result: 'success',
      data: <SwiftParameter[]>[
        <SwiftParameter>{
          externalName: null,
          localName: 'param',
          type: <SwiftTypeAnnotation>{
            attributes: null,
            isInout: false,
            type: <SwiftType>{
              type: 'type-identifier',
              name: 'Param',
              genericArguments: [],
              innerType: null,
            },
          },
          defaultArgument: null,
        },
      ],
      rest: [],
    });
  });
});

describe('functionSignature', () => {
  const parser = functionSignature;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftParameterClause>>({
      result: 'fail',
    });
  });

  test('Input: ()', () => {
    const input = [...'()'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionSignature>>({
      result: 'success',
      data: <SwiftFunctionSignature>{
        parameters: [],
        isAsync: false,
        isThrows: false,
        result: null,
      },
      rest: [],
    });
  });

  test('Input: () async', () => {
    const input = [...'() async'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionSignature>>({
      result: 'success',
      data: <SwiftFunctionSignature>{
        parameters: [],
        isAsync: true,
        isThrows: false,
        result: null,
      },
      rest: [],
    });
  });

  test('Input: () throws', () => {
    const input = [...'() throws'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionSignature>>({
      result: 'success',
      data: <SwiftFunctionSignature>{
        parameters: [],
        isAsync: false,
        isThrows: true,
        result: null,
      },
      rest: [],
    });
  });

  test('Input: () Sample', () => {
    const input = [...'() -> Sample'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionSignature>>({
      result: 'success',
      data: <SwiftFunctionSignature>{
        parameters: [],
        isAsync: false,
        isThrows: false,
        result: <SwiftFunctionResult>{
          type: <SwiftType>{
            type: 'type-identifier',
            name: 'Sample',
            genericArguments: [],
            innerType: null,
          },
        },
      },
      rest: [],
    });
  })
});

describe('functionResult', () => {
  const parser = functionResult;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionDeclaration>>({
      result: 'fail',
    });
  });

  test('Empty', () => {
    const input = [...'Sample'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionDeclaration>>({
      result: 'fail',
    });
  });

  test('Sample', () => {
    const input = [...'-> Sample'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionResult>>({
      result: 'success',
      data: <SwiftFunctionResult>{
        type: <SwiftTypeIdentifier>{
          type: 'type-identifier',
          name: 'Sample',
          genericArguments: [],
          innerType: null,
        },
      },
      rest: [],
    });
  });
});

describe('functionDeclaration', () => {
  const parser = functionDeclaration;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionDeclaration>>({
      result: 'fail',
    });
  });

  test('Input: func run()', () => {
    const input = [...'func run() {}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionDeclaration>>({
      result: 'success',
      data: <SwiftFunctionDeclaration>{
        type: 'function',
        head: <SwiftFunctionHead>{modifiers: []},
        name: 'run',
        signature: <SwiftFunctionSignature>{
          parameters: <SwiftParameter[]>[],
          isAsync: false,
          isThrows: false,
          result: null,
        },
        genericWhere: null,
        body: <SwiftFunctionBody>{
          statements: [],
        },
      },
      rest: [],
    });
  });

  test('Input: func run(key1: Type1) {}', () => {
    const input = [...'func run(key1: Type1) {}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionDeclaration>>({
      result: 'success',
      data: <SwiftFunctionDeclaration>{
        type: 'function',
        head: <SwiftFunctionHead>{modifiers: []},
        name: 'run',
        signature: <SwiftFunctionSignature>{
          parameters: <SwiftParameter[]>[
            <SwiftParameter>{
              externalName: null,
              localName: 'key1',
              type: <SwiftTypeAnnotation>{
                attributes: null,
                isInout: false,
                type: <SwiftType>{
                  type: 'type-identifier',
                  name: 'Type1',
                  genericArguments: [],
                  innerType: null,
                },
              },
              defaultArgument: null,

            }
          ],
          isAsync: false,
          isThrows: false,
          result: null,
        },
        genericWhere: null,
        body: <SwiftFunctionBody>{
          statements: [],
        },
      },
      rest: [],
    });
  });

  test('Input: func run() Sample {}', () => {
    const input = [...'func run() -> Sample {}'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionDeclaration>>({
      result: 'success',
      data: <SwiftFunctionDeclaration>{
        type: 'function',
        head: <SwiftFunctionHead>{modifiers: []},
        name: 'run',
        signature: <SwiftFunctionSignature>{
          parameters: <SwiftParameter[]>[],
          isAsync: false,
          isThrows: false,
          result: <SwiftFunctionResult>{
            type: <SwiftTypeIdentifier>{
              type: 'type-identifier',
              name: 'Sample',
              genericArguments: [],
              innerType: null,
            }
          },
        },
        genericWhere: null,
        body: <SwiftFunctionBody>{
          statements: [],
        },
      },
      rest: [],
    });
  });

  test('Input: func run() { let a }', () => {
    const input = [...'func run() { let a }'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftFunctionDeclaration>>({
      result: 'success',
      data: <SwiftFunctionDeclaration>{
        type: 'function',
        head: <SwiftFunctionHead>{modifiers: []},
        name: 'run',
        signature: <SwiftFunctionSignature>{
          parameters: <SwiftParameter[]>[],
          isAsync: false,
          isThrows: false,
          result: null,
        },
        genericWhere: null,
        body: <SwiftFunctionBody>{
          statements: [
            <SwiftStatementDeclaration>{
              type: 'declaration',
              value: <SwiftConstantDeclaration>{
                type: 'constant',
                patternInitializers: [
                  <SwiftPatternInitializer>{
                    pattern: <SwiftPatternIdentifier>{
                      type: 'identifier',
                      value: 'a',
                    },
                    initializer: null,
                  },
                ],
              },
            }
          ],
        },
      },
      rest: [],
    });
  });
});
