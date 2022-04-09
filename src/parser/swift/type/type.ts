import {ParserInput, ParserOutput} from "../../../types";
import {or} from "../../../combinators";
import {typeIdentifier} from "./type-identifier";

type SwiftTypeType = 'function'
  | 'array'
  | 'dictionary'
  | 'type-identifier'
  | 'tuple'
  | 'optional'
  | 'implicitly-unwrapped-optional'
  | 'protocol-composition'
  | 'opaque'
  | 'metatype'
  | 'any'
  | 'self';

export interface SwiftType {
  type: SwiftTypeType;
}

export function type(input: ParserInput): ParserOutput<SwiftType> {
  return or([
    typeIdentifier,
  ])(input);
}
