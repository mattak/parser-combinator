import {SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftTypeIdentifier} from "../../../syntax/swift";
import {KotlinType, KotlinTypeReference, KotlinUserType} from "../../../syntax/kotlin";

export function convert_typeIdentifier_type(
  table: SwiftKotlinConvertTable,
  input: SwiftTypeIdentifier,
): KotlinType {
  return <KotlinType>{
    value: <KotlinTypeReference>{
      type: 'typeReference',
      value: <KotlinUserType>{
        type: 'userType',
        name: input.name,
      },
    },
  }
}
