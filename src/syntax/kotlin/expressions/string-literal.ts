export type KotlinStringLiteral = KotlinLineStringLiteral | KotlinMultiLineStringLiteral

export interface KotlinLineStringLiteral {
  type: 'line',
  value: string,
}

export interface KotlinMultiLineStringLiteral {
  type: 'multiLine',
  value: string,
}
