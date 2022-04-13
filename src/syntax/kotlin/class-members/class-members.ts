export type KotlinClassMemberDeclarationType = 'declaration'
  | 'companionObject'
  | 'anonymousInitializer'
  | 'secondaryConstructor'
  ;

export interface KotlinClassMemberDeclaration {
  type: KotlinClassMemberDeclarationType,
}
