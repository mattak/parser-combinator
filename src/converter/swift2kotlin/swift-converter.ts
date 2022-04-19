import {
  SwiftConstantDeclaration,
  SwiftDeclaration,
  SwiftImportDeclaration,
  SwiftInitializer,
  SwiftLiteral,
  SwiftPattern,
  SwiftPatternInitializer,
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
import {convert_literal_literalConstant} from "./lexical-struct/literal";

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
  'literal': Converter<SwiftLiteral, any>,

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
  'literal': convert_literal_literalConstant,

  // kotlin
  'importList': convert_importDeclarations_importList,
  'packageHeader': convert_null_packageHeader,
}