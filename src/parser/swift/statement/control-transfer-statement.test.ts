import {
  breakExpression,
  continueExpression,
  controlTransferStatement,
  returnExpression
} from "./control-transfer-statement";
import {ParserOutput} from "../../../types";
import {
  SwiftBreakStatement,
  SwiftContinueStatement,
  SwiftControlTransferStatement,
  SwiftExpression,
  SwiftFallthroughStatement,
  SwiftPostfixExpression,
  SwiftPrefixExpression,
  SwiftReturnStatement,
  SwiftThrowStatement
} from "../../../syntax/swift";

describe('controlTransferStatement', () => {
  const parser = controlTransferStatement;

  test('empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftControlTransferStatement>>({
      result: 'fail',
    })
  })

  test('break', () => {
    const input = [...'break'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftControlTransferStatement>>({
      result: 'success',
      data: <SwiftBreakStatement>{
        type: "break",
        label: null,
      },
      rest: [],
    })
  })

  test('continue', () => {
    const input = [...'continue'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftControlTransferStatement>>({
      result: 'success',
      data: <SwiftContinueStatement>{
        type: "continue",
        label: null,
      },
      rest: [],
    })
  })

  test('return', () => {
    const input = [...'return'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftControlTransferStatement>>({
      result: 'success',
      data: <SwiftReturnStatement>{
        type: "return",
        expression: null,
      },
      rest: [],
    })
  })

  test('throw e', () => {
    const input = [...'throw e'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftControlTransferStatement>>({
      result: 'success',
      data: <SwiftThrowStatement>{
        type: "throw",
        expression: <SwiftExpression>{
          prefix: <SwiftPrefixExpression>{
            prefixOperator: null,
            postfixExpression: <SwiftPostfixExpression>{
              type: "primary",
              value: {
                type: "identifier",
                value: "e",
              },
            },
          }
        },
      },
      rest: [],
    })
  })

  test('fallthrough', () => {
    const input = [...'fallthrough'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftControlTransferStatement>>({
      result: 'success',
      data: <SwiftFallthroughStatement>{
        type: "fallthrough",
      },
      rest: [],
    })
  })
});

describe('breakExpression', () => {
  const parser = breakExpression;

  test('empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftBreakStatement>>({
      result: 'fail',
    })
  })

  test('break', () => {
    const input = [...'break'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftBreakStatement>>({
      result: 'success',
      data: <SwiftBreakStatement>{
        type: "break",
        label: null,
      },
      rest: [],
    })
  });

  test('break label', () => {
    const input = [...'break label'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftBreakStatement>>({
      result: 'success',
      data: <SwiftBreakStatement>{
        type: "break",
        label: 'label',
      },
      rest: [],
    })
  });
});

describe('continueExpression', () => {
  const parser = continueExpression;

  test('empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftBreakStatement>>({
      result: 'fail',
    })
  })

  test('continue', () => {
    const input = [...'continue'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftContinueStatement>>({
      result: 'success',
      data: <SwiftContinueStatement>{
        type: "continue",
        label: null,
      },
      rest: [],
    })
  });

  test('continue label', () => {
    const input = [...'continue label'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftContinueStatement>>({
      result: 'success',
      data: <SwiftContinueStatement>{
        type: "continue",
        label: 'label',
      },
      rest: [],
    })
  });
});

describe('returnExpression', () => {
  const parser = returnExpression;

  test('empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftReturnStatement>>({
      result: 'fail',
    })
  })

  test('return', () => {
    const input = [...'return'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftReturnStatement>>({
      result: 'success',
      data: <SwiftReturnStatement>{
        type: "return",
        expression: null
      },
      rest: [],
    })
  });

  test('return a', () => {
    const input = [...'return a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftReturnStatement>>({
      result: 'success',
      data: <SwiftReturnStatement>{
        type: "return",
        expression: <SwiftExpression>{
          prefix: <SwiftPrefixExpression>{
            prefixOperator: null,
            postfixExpression: <SwiftPostfixExpression>{
              type: "primary",
              value: {
                type: "identifier",
                value: "a",
              },
            },
          }
        },
      },
      rest: [],
    })
  });
});
