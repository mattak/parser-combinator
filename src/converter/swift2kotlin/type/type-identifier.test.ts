import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {KotlinType, KotlinTypeReference, KotlinUserType} from "../../../syntax/kotlin";
import {SwiftTypeIdentifier} from "../../../syntax/swift";
import {convert_typeIdentifier_type} from "./type-identifier";

describe('convert_typeIdentifier_type', () => {
  const converter = convert_typeIdentifier_type;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
  }

  test('default', () => {
    const input = <SwiftTypeIdentifier>{
      type: 'type-identifier',
      name: 'Sample',
      genericArguments: [],
      innerType: null,
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinType>(
      <KotlinType>{
        value: <KotlinTypeReference>{
          type: 'typeReference',
          value: <KotlinUserType>{
            type: 'userType',
            name: 'Sample',
          },
        },
      }
    );
  });

});
