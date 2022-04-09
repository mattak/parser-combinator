import {ParserOutput} from "../../../types";
import {SwiftLiteralExpression} from "./literal-expression";
import {SwiftLiteral} from "../lexical-struct/literal";
import {prefixExpression, SwiftPrefixExpression} from "./prefix-expression";

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
