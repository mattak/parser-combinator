import {ParserInput, ParserOutput} from "../../../types";
import {SwiftTypeAnnotation} from "../../../syntax/swift";
import {cat} from "../../../combinators";
import {char} from "../../../char";
import {map, opt, str} from "../../../util";
import {type} from "./type";
import {whitespace, whitespace0} from "../lexical-struct/whitespace";

export function typeAnnotation(input: ParserInput): ParserOutput<SwiftTypeAnnotation> {
  return map(cat([
      char(':'),
      whitespace0,
      // attributes?
      opt(cat([str('inout'), whitespace])),
      type,
    ]),
    ([, , inout, type]) => <SwiftTypeAnnotation>{
      // type-annotation :== <attributes>? 'inout'? <type>
      attributes: null,
      isInout: inout.status === 'some',
      type: type,
    })(input);
}
