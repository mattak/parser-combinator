import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftTypeAnnotation, SwiftTypeIdentifier} from "../../../syntax/swift";
import {KotlinType, KotlinTypeReference, KotlinUserType} from "../../../syntax/kotlin";
import {convert_typeAnnotation_type} from "./type-annotation";

describe('convert_typeAnnotation_type', () => {
  const converter = convert_typeAnnotation_type;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
  }

  test('default', () => {
    const input = <SwiftTypeAnnotation>{
      attributes: null,
      isInout: false,
      type: <SwiftTypeIdentifier>{
        type: 'type-identifier',
        name: 'Sample',
        genericArguments: [],
        innerType: null,
      },
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
