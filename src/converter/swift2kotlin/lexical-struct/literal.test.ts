import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftBooleanLiteral, SwiftNilLiteral, SwiftNumericLiteral} from "../../../syntax/swift";
import {
  KotlinBooleanLiteral,
  KotlinIntegerLiteral,
  KotlinNullLiteral
} from "../../../syntax/kotlin/expressions/expressions";
import {convert_literal_literalConstant} from "./literal";

describe('convert_pattern_variableDeclaration', () => {
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
