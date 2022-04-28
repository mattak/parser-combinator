export type KotlinLiteralConstantType = 'boolean'
  | 'integer'
  | 'hex'
  | 'bin'
  | 'character'
  | 'real'
  | 'null'
  | 'long'
  | 'unsigned'
  ;

export type KotlinLiteralConstant =
  KotlinBooleanLiteral
  | KotlinIntegerLiteral
  | KotlinNullLiteral
  | KotlinLongLiteral
  | KotlinCharacterLiteral

export interface KotlinBooleanLiteral {
  type: 'boolean',
  value: boolean,
}

export interface KotlinNullLiteral {
  type: 'null',
}

export interface KotlinIntegerLiteral {
  type: 'integer',
  value: number,
}

export interface KotlinLongLiteral {
  type: 'long',
  value: KotlinIntegerLiteral,
  suffix: 'L' | 'l' | null,
}

export interface KotlinRealLiteral {
  type: 'real',
  value: KotlinFloatLiteral | KotlinDoubleLiteral,
}

export interface KotlinCharacterLiteral {
  type: 'character',
  value: string,
}

export interface KotlinFloatLiteral {
  type: 'float',
  value: number,
}

export interface KotlinDoubleLiteral {
  type: 'double',
  value: number,
}
