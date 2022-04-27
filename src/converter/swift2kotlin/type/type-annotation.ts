import {KotlinType} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftTypeAnnotation} from "../../../syntax/swift";
import {convert_typeIdentifier_type} from "./type-identifier";

export function convert_typeAnnotation_type(
  table: SwiftKotlinConvertTable,
  input: SwiftTypeAnnotation,
): KotlinType {
  switch (input.type.type) {
    case "type-identifier":
      return convert_typeIdentifier_type(table, input.type);
  }
}
