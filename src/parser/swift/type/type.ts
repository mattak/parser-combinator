import {ParserInput, ParserOutput} from "../../../types";
import {or} from "../../../combinators";
import {typeIdentifier} from "./type-identifier";
import {SwiftType} from "../../../syntax/swift/type/type";

export function type(input: ParserInput): ParserOutput<SwiftType> {
  return or([
    typeIdentifier,
  ])(input);
}
