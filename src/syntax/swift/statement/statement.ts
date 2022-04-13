import {SwiftDeclaration} from "../declaration/declaration";

export type SwiftStatementType = 'declaration'
  | 'loop-statement'
  | 'branch-statement'
  | 'labeled-statement'
  | 'control-transfer-statement'
  | 'defer-statement'
  | 'do-statement'
  | 'compiler-control-statement'
  ;

export interface SwiftStatement {
  type: SwiftStatementType;
}

export interface SwiftStatementDeclaration {
  type: 'declaration',
  value: SwiftDeclaration,
}