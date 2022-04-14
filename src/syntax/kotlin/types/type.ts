export interface KotlinType {
  // typeModifier
  type: 'parenthesized' | 'nullable' | 'typeReference', // KotlinParenthesizedType | KotlinNullableType | KotlinTypeReference | KotlinFunctionType
}

export interface KotlinTypeReference {
  type: 'typeReference',
  userType: KotlinUserType,
}

export interface KotlinUserType {
  name: string, // simpleUserType (. simpleUserType)*
}
