import {ParserInput, ParserOutput} from "../../../types";
import {SwiftStatement, SwiftStatementControlTransferStatement, SwiftStatementDeclaration} from "../../../syntax/swift";
import {cat, or} from "../../../combinators";
import {declaration} from "../declaration/declaration";
import {char} from "../../../char";
import {map, opt} from "../../../util";
import {whitespace0} from "../lexical-struct/whitespace";
import {controlTransferStatement} from "./control-transfer-statement";

export function statement(input: ParserInput): ParserOutput<SwiftStatement> {
  return or<SwiftStatement>([
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
    // control-transfer-statement
    map(
      cat([
        controlTransferStatement,
        whitespace0,
        opt(char(';'))
      ]),
      ([ctrl, ,]) => <SwiftStatementControlTransferStatement>{
        type: 'control-transfer-statement',
        value: ctrl,
      }),
  ])(input);
}