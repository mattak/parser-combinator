import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftBooleanLiteral, SwiftNilLiteral, SwiftNumericLiteral, SwiftStringLiteral} from "../../../syntax/swift";
import {convert_literal_literalConstant, convert_literal_primaryExpression} from "./literal";
import {
  KotlinBooleanLiteral,
  KotlinIntegerLiteral,
  KotlinLineStringLiteral,
  KotlinNullLiteral,
  KotlinPrimaryExpressionStringLiteral
} from "../../../syntax/kotlin";

describe('convert_literal_literalConstant', () => {
  const converter = convert_literal_literalConstant;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
  }

  test('boolean', () => {
    const input = <SwiftBooleanLiteral>{
      type: 'boolean',
      value: false,
    };
    const output = converter(table, input);
    expect(output).toEqual(<KotlinBooleanLiteral>{
      type: 'boolean',
      value: false,
    });
  })

  test('nil', () => {
    const input = <SwiftNilLiteral>{
      type: 'nil',
    };
    const output = converter(table, input);
    expect(output).toEqual(<KotlinNullLiteral>{
      type: 'null',
    });
  })

  test('numeric', () => {
    const input = <SwiftNumericLiteral>{
      type: 'numeric',
      value: '1',
    };
    const output = converter(table, input);
    expect(output).toEqual(<KotlinIntegerLiteral>{
      type: 'integer',
      value: 1,
    });
  })
});

describe('convert_literal_primaryExpression', () => {
  const converter = convert_literal_primaryExpression;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'literal__primary-expression': convert_literal_primaryExpression,
  }

  test('string', () => {
    const input = <SwiftStringLiteral>{
      type: 'string',
      value: 'a',
    };
    const output = converter(table, input);
    expect(output).toEqual(
      <KotlinPrimaryExpressionStringLiteral>{
        type: 'stringLiteral',
        value: <KotlinLineStringLiteral>{
          type: 'line',
          value: 'a',
        }
      }
    );
  })
});
