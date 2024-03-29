import {ParserInput, ParserOutput} from "../../../types";
import {cat} from "../../../combinators";
import {char} from "../../../char";
import {list, map} from "../../../util";
import {whitespace0} from "../lexical-struct/whitespace";
import {type} from "../type/type";
import {SwiftType} from "../../../syntax/swift/type/type";

export function genericArgumentClause(input: ParserInput): ParserOutput<SwiftType[]> {
  return map(
    cat([
      char('<'),
      list(type, cat([whitespace0, char(','), whitespace0])),
      char('>'),
    ]),
    ([, types,]) => types
  )(input);
}
