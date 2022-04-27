// <function-declaration> ::= <function-head> <function-name> <generic-parameter-clause>? <function-signature> <generic-where-clause>? <function-body>?
// function-head ::= <attributes>? <declaration-modifiers>? func
// function-name ::= <identifier> | <operator>
// function-signature ::= <parameter-clause> 'async'? 'throws'? <function-result>?
// function-signature ::= <parameter-clause> 'async'? 'rethrows' <function-result>?
// function-result ::= '->' <attributes>? <type>
// function-body ::= <code-block>
// parameter-clause ::= ( ) | ( <parameter-list> )
// parameter-list ::= <parameter> | <parameter> , <parameter-list>
// parameter ::= <external-parameter-name>? <local-parameter-name> <type-annotation> <default-argument-clause>?
// parameter ::= <external-parameter-name>? <local-parameter-name> <type-annotation>
// parameter ::= <external-parameter-name>? <local-parameter-name> <type-annotation> ...
// external-parameter-name ::= <identifier>
// local-parameter-name ::= <identifier>
// default-argument-clause ::== <expression>

import {SwiftTypeAnnotation} from "../type/type";
import {SwiftExpression} from "../expression/expression";
import {SwiftStatement} from "../statement/statement";

export interface SwiftFunctionDeclaration {
  type: 'function',
  head: SwiftFunctionHead,
  name: SwiftFunctionName,
  // <generic-parameter-clause>?
  signature: SwiftFunctionSignature,
  genericWhere: null,
  body: SwiftFunctionBody | null,
}

export interface SwiftFunctionHead {
  // <attributes>? <declaration-modifiers>? func
}

export type SwiftFunctionName = string

export interface SwiftFunctionSignature {
  // <parameter-clause> 'async'? 'throws'? <function-result>?
  parameters: SwiftParameterClause,
  isAsync: boolean,
  isThrows: boolean,
  result: null, // FIXME: implement function result
}

export type SwiftParameterClause = SwiftParameterList
export type SwiftParameterList = SwiftParameter[]

export interface SwiftParameter {
  // parameter ::= <external-parameter-name>? <local-parameter-name> <type-annotation> <default-argument-clause>?
  // parameter ::= <external-parameter-name>? <local-parameter-name> <type-annotation>
  // parameter ::= <external-parameter-name>? <local-parameter-name> <type-annotation> ...
  externalName: SwiftExternalParameterName | null,
  localName: SwiftLocalParameterName,
  type: SwiftTypeAnnotation,
  defaultArgument: SwiftDefaultArgumentClause | null,
}

export type SwiftExternalParameterName = string
export type SwiftLocalParameterName = string
export type SwiftDefaultArgumentClause = SwiftExpression

export interface SwiftFunctionBody {
  statements: SwiftStatement[],
}
