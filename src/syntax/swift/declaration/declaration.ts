import {SwiftStatement} from "../statement/statement";
import {SwiftPattern} from "../pattern/pattern";
import {SwiftExpression} from "../expression/expression";

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

export interface SwiftDeclaration {
  type: SwiftDeclarationType,
}

// top-level
export interface SwiftTopLevelDeclaration {
  statements: SwiftStatement[],
}

// import
export interface SwiftImportDeclaration extends SwiftDeclaration {
  type: 'import',
  attributes: null,
  kind: null,
  path: string,
}

// struct
export interface SwiftStructMember {
  type: 'declaration' | 'compiler-control-statement',
}

export interface SwiftStructMemberDeclaration extends SwiftStructMember {
  type: 'declaration',
  value: SwiftDeclaration,
}

export interface SwiftStructDeclaration extends SwiftDeclaration {
  type: 'struct',
  name: string,
  accessLevelModifier: SwiftAccessLevelModifier | null,
  body: SwiftStructMember[],
}

// constant
export interface SwiftConstantDeclaration extends SwiftDeclaration {
  type: 'constant',
  patternInitializers: SwiftPatternInitializer[],
}

export interface SwiftPatternInitializer {
  pattern: SwiftPattern,
  initializer: SwiftInitializer | null,
}

export interface SwiftInitializer extends SwiftExpression {
}

// modifier
export type SwiftDeclarationModifierPrimitive =
  'class'
  | 'convenience'
  | 'dynamic'
  | 'final'
  | 'infix'
  | 'lazy'
  | 'optional'
  | 'override'
  | 'postfix'
  | 'prefix'
  | 'required'
  | 'static'
  | 'unowned'
  | 'unowned(safe)'
  | 'unowned(unsafe)'
  | 'weak'
  ;
export type SwiftAccessLevelModifier =
  'private' | 'private(set)'
  | 'fileprivate' | 'fileprivate(set)'
  | 'internal' | 'internal(set)'
  | 'public' | 'public(set)'
  | 'open' | 'open(set)'
  ;
export type SwiftMutationModifier = 'mutating' | 'nonmutating';
export type SwiftActorIsolationModifier = 'nonisolated';
export type SwiftDeclarationModifier =
  SwiftDeclarationModifierPrimitive
  | SwiftAccessLevelModifier
  | SwiftMutationModifier
  | SwiftActorIsolationModifier
  ;