import {SwiftExpression} from "../expression/expression";

export type SwiftControlTransferStatement = SwiftBreakStatement
  | SwiftContinueStatement
  | SwiftFallthroughStatement
  | SwiftReturnStatement
  | SwiftThrowStatement
  ;

export interface SwiftBreakStatement {
  type: "break",
  label: string | null,
}

export interface SwiftContinueStatement {
  type: "continue"
  label: string | null,
}

export interface SwiftFallthroughStatement {
  type: "fallthrough"
}

export interface SwiftReturnStatement {
  type: "return"
  expression: SwiftExpression | null,
}

export interface SwiftThrowStatement {
  type: "throw"
  expression: SwiftExpression,
}
