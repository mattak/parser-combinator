import {ParserOutput} from "../../../types";
import {primaryExpression, SwiftPrimaryExpression, SwiftPrimaryExpressionLiteral} from "./primary-expression";
import {SwiftLiteralExpression} from "./literal-expression";
import {SwiftLiteral} from "../lexical-struct/literal";

describe('primary-expression', () => {
  const parser = primaryExpression;

  test('Empty Input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftPrimaryExpression>>({
      result: 'fail',
    });
  });

  test('Input: identifier a', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftPrimaryExpression>>({
      result: 'success',
      data: <SwiftPrimaryExpression>{
        primaryType: 'identifier',
        value: 'a'
      },
      rest: [],
    });
  });

  test('Input: literal 1', () => {
    const input = [...'1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftPrimaryExpression>>({
      result: 'success',
      data: <SwiftPrimaryExpressionLiteral>{
        primaryType: 'literal',
        value: <SwiftLiteralExpression>{
          type: 'literal',
          value: <SwiftLiteral>{
            type: 'numeric',
            value: '1',
            numericType: 'integer',
          },
        }
      },
      rest: [],
    });
  });
});