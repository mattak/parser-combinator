import {ParserOutput} from "../../../types";
import {prefixExpression} from "./prefix-expression";
import {SwiftLiteral, SwiftLiteralExpression, SwiftPrefixExpression} from "../../../syntax/swift";

describe('prefix-expression', () => {
  const parser = prefixExpression;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftPrefixExpression>>({
      result: 'fail',
    });
  });

  test('1', () => {
    const input = [...'1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftPrefixExpression>>({
      result: 'success',
      data: <SwiftPrefixExpression>{
        prefixOperator: null,
        postfixExpression: {
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
        }
      },
      rest: [],
    });
  });
});
