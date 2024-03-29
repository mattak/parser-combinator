import {ParserOutput} from "../../../types";
import {expression} from "./expression";
import {
  SwiftExpression,
  SwiftLiteralExpression,
  SwiftPostfixExpressionPrimary,
  SwiftPrimaryExpression
} from "../../../syntax/swift";

describe('expression', () => {
  const parser = expression;

  test('Empty input', () => {
    const input = [...''] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftExpression>>({
      result: 'fail'
    });
  });

  test('Input: 1', () => {
    const input = [...'1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftExpression>>({
      result: 'success',
      data: <SwiftExpression>{
        prefix: {
          prefixOperator: null,
          postfixExpression: <SwiftPostfixExpressionPrimary>{
            type: 'primary',
            value: <SwiftPrimaryExpression>{
              type: 'literal',
              value: <SwiftLiteralExpression>{
                type: 'literal',
                value: {
                  type: 'numeric',
                  numericType: 'integer',
                  value: '1',
                }
              },
            }
          },
        }
      },
      rest: [],
    });
  });
});