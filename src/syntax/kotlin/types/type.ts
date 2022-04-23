export interface KotlinType {
  // typeModifier
  value: KotlinParenthesizedType | KotlinNullableType | KotlinTypeReference, // | KotlinFunctionType
}

export interface KotlinTypeReference {
  type: 'typeReference',
  value: KotlinTypeReferenceType,
}

export type KotlinTypeReferenceType = KotlinUserType | KotlinDynamicType

export interface KotlinNullableType {
  type: 'nullable',
  value: KotlinTypeReference | KotlinParenthesizedType,
}

export interface KotlinParenthesizedType {
  type: 'parenthesized',
  value: KotlinType,
}

export interface KotlinUserType {
  type: 'userType',
  name: string, // simpleUserType (. simpleUserType)*
}

export interface KotlinDynamicType {
  type: 'dynamicType',
}