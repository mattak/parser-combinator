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
