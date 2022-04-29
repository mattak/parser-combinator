import {ParserInput, ParserOutput} from "../../../types";
import {typeIdentifier} from "./type-identifier";
import {SwiftType} from "../../../syntax/swift";

export function type(input: ParserInput): ParserOutput<SwiftType> {
  return typeIdentifier(input);
}
