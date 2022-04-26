import {ParserInput, ParserOutput} from "../../../types";
import {SwiftStatement, SwiftStatementDeclaration} from "../../../syntax/swift";
import {cat, or} from "../../../combinators";
import {declaration} from "../declaration/declaration";
import {char} from "../../../char";
import {map, opt} from "../../../util";
import {whitespace0} from "../lexical-struct/whitespace";

export function statement(input: ParserInput): ParserOutput<SwiftStatement> {
  return or([
    // declaration
    map(
      cat([
        declaration,
        whitespace0,
        opt(char(';'))
      ]),
      ([dec, ,]) => {
        return <SwiftStatementDeclaration>{
          type: 'declaration',
          value: dec,
        }
      }
    ),
  ])(input);
}