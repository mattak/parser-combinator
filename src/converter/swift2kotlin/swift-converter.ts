import {
  SwiftConstantDeclaration,
  SwiftDeclaration,
  SwiftExpression,
  SwiftImportDeclaration,
  SwiftInitializer,
  SwiftLiteral, SwiftLiteralExpression,
  SwiftLiteralExpressionLiteral,
  SwiftPattern,
  SwiftPatternInitializer,
  SwiftPrimaryExpression,
  SwiftStatement,
  SwiftStructDeclaration,
  SwiftStructMember,
  SwiftTopLevelDeclaration
} from "../../syntax/swift";
import {convert_null_packageHeader, convert_topLevelDeclaration_file} from "./declaration/top-level-declaration";
import {convert_statement_declaration} from "./statement/statement";
import {
  convert_importDeclaration_importHeader,
  convert_importDeclarations_importList
} from "./declaration/import-declaration";
import {KotlinImportHeader, KotlinImportList} from "../../syntax/kotlin";
import {
  convert_structDeclaration_objectDeclaration,
  convert_structMember_classMember
} from "./declaration/struct-declaration";
import {convert_declaration_declaration} from "./declaration/declaration";
import {
  convert_constantDeclaration_propertyDeclaration,
  convert_initializer_expression,
  convert_pattern_variableDeclaration,
  convert_patternInitializer_propertyDeclaration
} from "./declaration/constant-declaration";
import {convert_literal_literalConstant, convert_literal_primaryExpression} from "./lexical-struct/literal";
import {
  convert_expression_expression,
  convert_literalExpression_primaryExpression,
  convert_primaryExpression_primaryExpression
} from "./expression/expression";
import {KotlinLiteralConstant, KotlinPrimaryExpression} from "../../syntax/kotlin/expressions/expressions";

export type Converter<From, To> = (table: SwiftKotlinConvertTable, input: From) => To;

export interface SwiftKotlinConvertTable {
  // swift
  'top-level-declaration': Converter<SwiftTopLevelDeclaration, any>,
  'statement': Converter<SwiftStatement, any>,
  'declaration': Converter<SwiftDeclaration, any>,
  'import-declaration': Converter<SwiftImportDeclaration, KotlinImportHeader>,
  'struct-declaration': Converter<SwiftStructDeclaration, any>,
  'struct-member': Converter<SwiftStructMember, any>,
  'constant-declaration': Converter<SwiftConstantDeclaration, any>,
  'pattern-initializer': Converter<SwiftPatternInitializer, any>,
  'pattern': Converter<SwiftPattern, any>,
  'initializer': Converter<SwiftInitializer, any>,
  'literal__literal-constant': Converter<SwiftLiteral, KotlinLiteralConstant>,
  'literal__primary-expression': Converter<SwiftLiteral, KotlinPrimaryExpression>,
  'expression': Converter<SwiftExpression, any>,
  'primary-expression': Converter<SwiftPrimaryExpression, any>,
  'literal-expression': Converter<SwiftLiteralExpression, any>,

  // kotlin
  'importList': Converter<SwiftImportDeclaration[], KotlinImportList>,
  'packageHeader': Converter<null, string>,
}

export const defaultSwiftKotlinConvertTable: SwiftKotlinConvertTable = {
  // swift
  'top-level-declaration': convert_topLevelDeclaration_file,
  'statement': convert_statement_declaration,
  'declaration': convert_declaration_declaration,
  'import-declaration': convert_importDeclaration_importHeader,
  'struct-declaration': convert_structDeclaration_objectDeclaration,
  'struct-member': convert_structMember_classMember,
  'constant-declaration': convert_constantDeclaration_propertyDeclaration,
  'pattern-initializer': convert_patternInitializer_propertyDeclaration,
  'pattern': convert_pattern_variableDeclaration,
  'initializer': convert_initializer_expression,
  'literal__literal-constant': convert_literal_literalConstant,
  'literal__primary-expression': convert_literal_primaryExpression,
  'expression': convert_expression_expression,
  'primary-expression': convert_primaryExpression_primaryExpression,
  'literal-expression': convert_literalExpression_primaryExpression,

  // kotlin
  'importList': convert_importDeclarations_importList,
  'packageHeader': convert_null_packageHeader,
}