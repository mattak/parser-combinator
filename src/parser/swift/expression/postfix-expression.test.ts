import {postfixExpression, SwiftPostfixExpression, SwiftPostfixExpressionPrimary} from "./postfix-expression";
import {ParserOutput} from "../../../types";
import {SwiftLiteralExpression} from "./literal-expression";
import {SwiftLiteral} from "../../../syntax/swift";

describe('postfix-expression', () => {
  const parser = postfixExpression;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftPostfixExpression>>({
      result: 'fail',
    });
  });

  test('1', () => {
    const input = [...'1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftPostfixExpression>>({
      result: 'success',
      data: <SwiftPostfixExpressionPrimary>{
        postfixType: 'primary',
        primaryType: 'literal',
        value: <SwiftLiteralExpression>{
          type: 'literal',
          value: <SwiftLiteral>{
            type: 'numeric',
            numericType: 'integer',
            value: '1',
          },
        }
      },
      rest: [],
    });
  });
});
