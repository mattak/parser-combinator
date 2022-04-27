import {
  SwiftConstantDeclaration,
  SwiftDeclaration,
  SwiftExpression,
  SwiftFunctionDeclaration,
  SwiftFunctionSignature,
  SwiftImportDeclaration,
  SwiftInitializer,
  SwiftLiteral,
  SwiftLiteralExpression,
  SwiftParameter,
  SwiftPattern,
  SwiftPatternInitializer,
  SwiftPrimaryExpression,
  SwiftStatement,
  SwiftStructDeclaration,
  SwiftStructMember,
  SwiftTopLevelDeclaration,
  SwiftTypeAnnotation
} from "../../syntax/swift";
import {convert_null_packageHeader, convert_topLevelDeclaration_file} from "./declaration/top-level-declaration";
import {convert_statement_declaration} from "./statement/statement";
import {
  convert_importDeclaration_importHeader,
  convert_importDeclarations_importList
} from "./declaration/import-declaration";
import {
  KotlinClassMemberDeclaration,
  KotlinDeclaration,
  KotlinFunctionDeclaration,
  KotlinFunctionValueParameter,
  KotlinFunctionValueParameters,
  KotlinImportHeader,
  KotlinImportList,
  KotlinLiteralConstant, KotlinParameter,
  KotlinPrimaryExpression,
  KotlinPropertyDeclaration,
  KotlinType
} from "../../syntax/kotlin";
import {
  convert_structDeclaration_objectDeclaration,
  convert_structMember_classMemberDeclarations
} from "./declaration/struct-declaration";
import {convert_declaration_declarations} from "./declaration/declaration";
import {
  convert_constantDeclaration_propertyDeclarations,
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
import {convert_typeAnnotation_type} from "./type/type-annotation";
import {
  convert_functionDeclaration_functionDeclaration,
  convert_functionSignature_functionValueParameters,
  convert_parameter_functionValueParameter, convert_parameter_parameter
} from "./declaration/function-declaration";

export type Converter<From, To> = (table: SwiftKotlinConvertTable, input: From) => To;

export interface SwiftKotlinConvertTable {
  // swift
  'top-level-declaration': Converter<SwiftTopLevelDeclaration, any>,
  'statement': Converter<SwiftStatement, any>,
  'declaration': Converter<SwiftDeclaration, KotlinDeclaration[]>,
  'import-declaration': Converter<SwiftImportDeclaration, KotlinImportHeader>,
  'struct-declaration': Converter<SwiftStructDeclaration, KotlinDeclaration>,
  'struct-member': Converter<SwiftStructMember, KotlinClassMemberDeclaration[]>,
  'constant-declaration': Converter<SwiftConstantDeclaration, KotlinPropertyDeclaration[]>,
  'pattern-initializer': Converter<SwiftPatternInitializer, any>,
  'pattern': Converter<SwiftPattern, any>,
  'initializer': Converter<SwiftInitializer, any>,
  'literal__literal-constant': Converter<SwiftLiteral, KotlinLiteralConstant>,
  'literal__primary-expression': Converter<SwiftLiteral, KotlinPrimaryExpression>,
  'expression': Converter<SwiftExpression, any>,
  'primary-expression': Converter<SwiftPrimaryExpression, any>,
  'literal-expression': Converter<SwiftLiteralExpression, any>,
  'type-annotation__type': Converter<SwiftTypeAnnotation, KotlinType>,
  'function-declaration': Converter<SwiftFunctionDeclaration, KotlinFunctionDeclaration>,
  'function-signature': Converter<SwiftFunctionSignature, KotlinFunctionValueParameters>,
  'parameter__functionValueParameter': Converter<SwiftParameter, KotlinFunctionValueParameter>,
  'parameter__parameter': Converter<SwiftParameter, KotlinParameter>,

  // kotlin
  'importList': Converter<SwiftImportDeclaration[], KotlinImportList>,
  'packageHeader': Converter<null, string>,
}

export const defaultSwiftKotlinConvertTable: SwiftKotlinConvertTable = {
  // swift
  'top-level-declaration': convert_topLevelDeclaration_file,
  'statement': convert_statement_declaration,
  'declaration': convert_declaration_declarations,
  'import-declaration': convert_importDeclaration_importHeader,
  'struct-declaration': convert_structDeclaration_objectDeclaration,
  'struct-member': convert_structMember_classMemberDeclarations,
  'constant-declaration': convert_constantDeclaration_propertyDeclarations,
  'pattern-initializer': convert_patternInitializer_propertyDeclaration,
  'pattern': convert_pattern_variableDeclaration,
  'initializer': convert_initializer_expression,
  'literal__literal-constant': convert_literal_literalConstant,
  'literal__primary-expression': convert_literal_primaryExpression,
  'expression': convert_expression_expression,
  'primary-expression': convert_primaryExpression_primaryExpression,
  'literal-expression': convert_literalExpression_primaryExpression,
  'type-annotation__type': convert_typeAnnotation_type,
  'function-declaration': convert_functionDeclaration_functionDeclaration,
  'function-signature': convert_functionSignature_functionValueParameters,
  'parameter__functionValueParameter': convert_parameter_functionValueParameter,
  'parameter__parameter': convert_parameter_parameter,

  // kotlin
  'importList': convert_importDeclarations_importList,
  'packageHeader': convert_null_packageHeader,
}