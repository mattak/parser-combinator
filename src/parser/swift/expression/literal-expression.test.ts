import {literal, SwiftLiteral} from "../lexical-struct/literal";
import {ParserOutput} from "../../../types";
import {literalExpression, SwiftLiteralExpression, SwiftLiteralExpressionLiteral} from "./literal-expression";

describe('literal', () => {
  const parser = literalExpression;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftLiteralExpression>>({
      result: 'fail',
    })
  });

  test('1', () => {
    const input = [...'1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftLiteralExpression>>({
      result: 'success',
      data: <SwiftLiteralExpressionLiteral>{
        type: 'literal',
        value: <SwiftLiteral>{
          type: 'numeric',
          numericType: 'integer',
          value: '1'
        }
      },
      rest: [],
    })
  });
});
