import {SwiftDeclaration} from "../declaration/declaration";
import {SwiftControlTransferStatement} from "./control-transfer-statement";

export type SwiftStatementType = 'declaration'
  | 'loop-statement'
  | 'branch-statement'
  | 'labeled-statement'
  | 'control-transfer-statement'
  | 'defer-statement'
  | 'do-statement'
  | 'compiler-control-statement'
  ;

export type SwiftStatement = SwiftStatementDeclaration | SwiftStatementControlTransferStatement

export interface SwiftStatementDeclaration {
  type: 'declaration',
  value: SwiftDeclaration,
}

export interface SwiftStatementControlTransferStatement {
  type: 'control-transfer-statement',
  value: SwiftControlTransferStatement,
}