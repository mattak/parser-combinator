import {SwiftStatement} from "../statement/statement";
import {SwiftPattern} from "../pattern/pattern";
import {SwiftExpression} from "../expression/expression";
import {SwiftFunctionDeclaration} from "./function-declaration";
import {SwiftAccessLevelModifier} from "./access-control-levels";

type SwiftDeclarationType = 'import'
  | 'constant'
  | 'variable'
  | 'typealias'
  | 'function'
  | 'enum'
  | 'struct'
  | 'class'
  | 'actor'
  | 'protocol'
  | 'initializer'
  | 'deinitializer'
  | 'extension'
  | 'subscript'
  | 'operator'
  | 'precedence-group';

export type SwiftDeclaration =
  SwiftImportDeclaration
  | SwiftStructDeclaration
  | SwiftConstantDeclaration
  | SwiftFunctionDeclaration

// top-level
export interface SwiftTopLevelDeclaration {
  statements: SwiftStatement[],
}

// import
export interface SwiftImportDeclaration {
  type: 'import',
  attributes: null,
  kind: null,
  path: string,
}

// struct
export type SwiftStructMember = SwiftStructMemberDeclaration

export interface SwiftStructMemberDeclaration {
  type: 'declaration',
  value: SwiftDeclaration,
}

export interface SwiftStructDeclaration {
  type: 'struct',
  name: string,
  accessLevelModifier: SwiftAccessLevelModifier | null,
  body: SwiftStructMember[],
}

// constant
export interface SwiftConstantDeclaration {
  type: 'constant',
  patternInitializers: SwiftPatternInitializer[],
}

export interface SwiftPatternInitializer {
  pattern: SwiftPattern,
  initializer: SwiftInitializer | null,
}

export type SwiftInitializer = SwiftExpression