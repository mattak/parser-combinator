import {ParserInput, ParserOutput} from "../../../types";
import {SwiftStatement} from "../../../syntax/swift";
import {list0, map} from "../../../util";
import {cat} from "../../../combinators";
import {char} from "../../../char";
import {whitespace0} from "../lexical-struct/whitespace";
import {statement} from "../statement/statement";

export function codeBlock(input: ParserInput): ParserOutput<SwiftStatement[]> {
  return map(
    cat([
      char('{'),
      whitespace0,
      list0(statement, whitespace0),
      char('}'),
    ]),
    ([, , statements, ,]) => statements
  )(input);
}
