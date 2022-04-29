import {KotlinType} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftType} from "../../../syntax/swift";
import {convert_typeIdentifier_type} from "./type-identifier";

export function convert_type_type(
  table: SwiftKotlinConvertTable,
  input: SwiftType,
): KotlinType {
  switch (input.type) {
    case "type-identifier":
      return convert_typeIdentifier_type(table, input);
  }
}