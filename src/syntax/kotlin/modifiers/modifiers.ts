export type KotlinModifiers = KotlinModifier[]

export type KotlinModifier = KotlinClassModifier
  | KotlinMemberModifier
  | KotlinVisibilityModifier
  | KotlinFunctionModifier
  | KotlinPropertyModifier
  | KotlinInheritanceModifier
  | KotlinParameterModifier
  | KotlinPlatformModifier
  ;
export type KotlinClassModifier = 'enum'
  | 'sealed'
  | 'annotation'
  | 'data'
  | 'inner'
  | 'value'
  ;
export type KotlinMemberModifier = 'override'
  | 'lateinit'
  ;
export type KotlinVisibilityModifier = 'public'
  | 'private'
  | 'internal'
  | 'protected'
  ;
export type KotlinVarianceModifier = 'public'
  | 'in'
  | 'out'
  ;
export type KotlinFunctionModifier = 'tailrec'
  | 'operator'
  | 'infix'
  | 'inline'
  | 'external'
  | 'suspend'
  ;
export type KotlinPropertyModifier = 'const'
  ;
export type KotlinInheritanceModifier = 'abstract'
  | 'final'
  | 'open'
  ;
export type KotlinParameterModifier = 'vararg'
  | 'noinline'
  | 'crossinline'
  ;
export type KotlinReificationModifier = 'reified'
  ;
export type KotlinPlatformModifier = 'expect'
  | 'actual'
  ;
