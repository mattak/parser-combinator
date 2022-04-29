import {convert_declarationModifier_modifier} from "./access-control-levels";
import {SwiftDeclarationModifier} from "../../../syntax/swift";
import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";

describe('convert_declarationModifier_modifier', () => {
  const converter = convert_declarationModifier_modifier;

  test('private', () => {
    const input = <SwiftDeclarationModifier>'private';
    const table = <SwiftKotlinConvertTable>{
      ...defaultSwiftKotlinConvertTable,
    };
    const output = converter(table, input);
    expect(output).toEqual('private');
  });

  test('static', () => {
    const input = <SwiftDeclarationModifier>'static';
    const table = <SwiftKotlinConvertTable>{
      ...defaultSwiftKotlinConvertTable,
    };
    const output = converter(table, input);
    expect(output).toEqual(null);
  });
});
