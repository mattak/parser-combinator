import {arrayLiteral, SwiftArrayLiteral} from "./array-literal";
import {ParserOutput} from "../../../types";
import {SwiftLiteralExpression} from "../expression/literal-expression";
import {SwiftExpression} from "../expression/expression";
import {SwiftPrefixExpression} from "../expression/prefix-expression";
import {SwiftPostfixExpressionPrimary} from "../expression/postfix-expression";
import {SwiftLiteral} from "./literal";

describe('arrayLiteral', () => {
  const parser = arrayLiteral;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftArrayLiteral>>({
      result: 'fail'
    })
  });

  test('[]', () => {
    const input = [...'[]'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftArrayLiteral>>({
      result: 'success',
      data: <SwiftArrayLiteral>{
        expressions: [],
      },
      rest: [],
    })
  });

  test('[1]', () => {
    const input = [...'[1]'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftArrayLiteral>>({
      result: 'success',
      data: <SwiftArrayLiteral>{
        expressions: [
          <SwiftExpression>{
            prefix: <SwiftPrefixExpression>{
              prefixOperator: null,
              postfixExpression: <SwiftPostfixExpressionPrimary>{
                postfixType: 'primary',
                primaryType: 'literal',
                value: <SwiftLiteralExpression>{
                  type: 'literal',
                  value: <SwiftLiteral>{
                    type: 'numeric',
                    numericType: 'integer',
                    value: '1',
                  }
                }
              }
            }
          }
        ],
      },
      rest: [],
    })
  });

  test('[1,2]', () => {
    const input = [...'[1,2]'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftArrayLiteral>>({
      result: 'success',
      data: <SwiftArrayLiteral>{
        expressions: [
          <SwiftExpression>{
            prefix: <SwiftPrefixExpression>{
              prefixOperator: null,
              postfixExpression: <SwiftPostfixExpressionPrimary>{
                postfixType: 'primary',
                primaryType: 'literal',
                value: <SwiftLiteralExpression>{
                  type: 'literal',
                  value: <SwiftLiteral>{
                    type: 'numeric',
                    numericType: 'integer',
                    value: '1',
                  }
                }
              }
            }
          },
          <SwiftExpression>{
            prefix: <SwiftPrefixExpression>{
              prefixOperator: null,
              postfixExpression: <SwiftPostfixExpressionPrimary>{
                postfixType: 'primary',
                primaryType: 'literal',
                value: <SwiftLiteralExpression>{
                  type: 'literal',
                  value: <SwiftLiteral>{
                    type: 'numeric',
                    numericType: 'integer',
                    value: '2',
                  }
                }
              }
            }
          }
        ],
      },
      rest: [],
    })
  });
});
