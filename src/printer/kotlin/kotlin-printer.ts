import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinDeclaration,
  KotlinFile,
  KotlinFunctionDeclaration,
  KotlinFunctionValueParameter,
  KotlinFunctionValueParameters,
  KotlinImportList,
  KotlinObjectDeclaration, KotlinParameter,
  KotlinPropertyDeclaration,
  KotlinVariableDeclaration
} from "../../syntax/kotlin";
import {kotlinFilePrinter, kotlinImportListPrinter} from "./general/file";
import {kotlinDeclarationPrinter} from "./general/declaration";
import {
  kotlinClassBodyPrinter,
  kotlinClassMemberDeclarationPrinter,
  kotlinObjectDeclarationPrinter
} from "./class/object-declaration";
import {kotlinPropertyDeclarationPrinter, kotlinVariableDeclarationPrinter} from "./class-members/property-declaration";
import {
  KotlinAdditiveExpression,
  KotlinAsExpression,
  KotlinComparison,
  KotlinConjunction,
  KotlinDisjunction,
  KotlinElvisExpression,
  KotlinEquality,
  KotlinExpression,
  KotlinGenericCallLikeComparison,
  KotlinInfixFunctionCall,
  KotlinInfixOperation,
  KotlinLiteralConstant,
  KotlinMultiplicativeExpression,
  KotlinPostfixUnaryExpression,
  KotlinPrefixUnaryExpression,
  KotlinPrimaryExpression,
  KotlinRangeExpression
} from "../../syntax/kotlin/expressions/expressions";
import {
  kotlinAdditiveExpressionPrinter,
  kotlinAsExpressionPrinter,
  kotlinComparisonPrinter,
  kotlinConjunctionPrinter,
  kotlinDisjunctionPrinter,
  kotlinElvisExpressionPrinter,
  kotlinEqualityPrinter,
  kotlinExpressionPrinter,
  kotlinGenericCallLikeComparisonPrinter,
  kotlinInfixFunctionCallPrinter,
  kotlinInfixOperationPrinter,
  kotlinMultiplicativeExpressionPrinter,
  kotlinPostfixUnaryExpressionPrinter,
  kotlinPrefixUnaryExpressionPrinter,
  kotlinRangeExpressionPrinter,
} from "./expressions/expression";
import {kotlinLiteralConstantPrinter} from "./expressions/literal-constant";
import {kotlinPrimaryExpressionPrinter} from "./expressions/primary-expression";
import {KotlinStringLiteral} from "../../syntax/kotlin/expressions/string-literal";
import {kotlinStringLiteralPrinter} from "./expressions/string-literal";
import {
  kotlinFunctionDeclarationPrinter,
  kotlinFunctionValueParameterPrinter,
  kotlinFunctionValueParametersPrinter, kotlinParameterPrinter
} from "./class-members/function-declaration";
import {
  KotlinNullableType,
  KotlinParenthesizedType,
  KotlinType,
  KotlinTypeReference
} from "../../syntax/kotlin/types/type";
import {
  kotlinNullableTypePrinter,
  kotlinParenthesizedTypePrinter,
  kotlinTypePrinter,
  kotlinTypeReferencePrinter
} from "./type/type";

export type PrinterOutput = string[];
export type KotlinPrinter<T> = (table: KotlinPrinterTable, input: T, depth: number) => PrinterOutput;
export const kotlinIndent = "    ";

export interface KotlinPrinterTable {
  'file': KotlinPrinter<KotlinFile>,
  'import-list': KotlinPrinter<KotlinImportList>,
  'declaration': KotlinPrinter<KotlinDeclaration>,
  'object-declaration': KotlinPrinter<KotlinObjectDeclaration>,
  'class-body': KotlinPrinter<KotlinClassBody>,
  'class-member-declaration': KotlinPrinter<KotlinClassMemberDeclaration>,
  'property-declaration': KotlinPrinter<KotlinPropertyDeclaration>,
  'variable-declaration': KotlinPrinter<KotlinVariableDeclaration>,
  'function-declaration': KotlinPrinter<KotlinFunctionDeclaration>,
  'function-value-parameters': KotlinPrinter<KotlinFunctionValueParameters>,
  'function-value-parameter': KotlinPrinter<KotlinFunctionValueParameter>,
  'parameter': KotlinPrinter<KotlinParameter>,
  'expression': KotlinPrinter<KotlinExpression>,
  'disjunction': KotlinPrinter<KotlinDisjunction>,
  'conjunction': KotlinPrinter<KotlinConjunction>,
  'equality': KotlinPrinter<KotlinEquality>,
  'comparison': KotlinPrinter<KotlinComparison>,
  'generic-call-like-comparison': KotlinPrinter<KotlinGenericCallLikeComparison>,
  'infix-operation': KotlinPrinter<KotlinInfixOperation>,
  'elvis-expression': KotlinPrinter<KotlinElvisExpression>,
  'infix-function-call': KotlinPrinter<KotlinInfixFunctionCall>,
  'range-expression': KotlinPrinter<KotlinRangeExpression>,
  'additive-expression': KotlinPrinter<KotlinAdditiveExpression>,
  'multiplicative-expression': KotlinPrinter<KotlinMultiplicativeExpression>,
  'as-expression': KotlinPrinter<KotlinAsExpression>,
  'prefix-unary-expression': KotlinPrinter<KotlinPrefixUnaryExpression>,
  'postfix-unary-expression': KotlinPrinter<KotlinPostfixUnaryExpression>,
  'primary-expression': KotlinPrinter<KotlinPrimaryExpression>
  'literal-constant': KotlinPrinter<KotlinLiteralConstant>,
  'string-literal': KotlinPrinter<KotlinStringLiteral>,
  'type': KotlinPrinter<KotlinType>,
  'type-reference': KotlinPrinter<KotlinTypeReference>,
  'parenthesized-type': KotlinPrinter<KotlinParenthesizedType>,
  'nullable-type': KotlinPrinter<KotlinNullableType>,
}

export const defaultKotlinPrinterTable: KotlinPrinterTable = {
  'file': kotlinFilePrinter,
  'import-list': kotlinImportListPrinter,
  'declaration': kotlinDeclarationPrinter,
  'object-declaration': kotlinObjectDeclarationPrinter,
  'class-body': kotlinClassBodyPrinter,
  'class-member-declaration': kotlinClassMemberDeclarationPrinter,
  'property-declaration': kotlinPropertyDeclarationPrinter,
  'variable-declaration': kotlinVariableDeclarationPrinter,
  'function-declaration': kotlinFunctionDeclarationPrinter,
  'function-value-parameters': kotlinFunctionValueParametersPrinter,
  'function-value-parameter': kotlinFunctionValueParameterPrinter,
  'parameter': kotlinParameterPrinter,
  'expression': kotlinExpressionPrinter,
  'disjunction': kotlinDisjunctionPrinter,
  'conjunction': kotlinConjunctionPrinter,
  'equality': kotlinEqualityPrinter,
  'comparison': kotlinComparisonPrinter,
  'generic-call-like-comparison': kotlinGenericCallLikeComparisonPrinter,
  'infix-operation': kotlinInfixOperationPrinter,
  'elvis-expression': kotlinElvisExpressionPrinter,
  'infix-function-call': kotlinInfixFunctionCallPrinter,
  'range-expression': kotlinRangeExpressionPrinter,
  'additive-expression': kotlinAdditiveExpressionPrinter,
  'multiplicative-expression': kotlinMultiplicativeExpressionPrinter,
  'as-expression': kotlinAsExpressionPrinter,
  'prefix-unary-expression': kotlinPrefixUnaryExpressionPrinter,
  'postfix-unary-expression': kotlinPostfixUnaryExpressionPrinter,
  'primary-expression': kotlinPrimaryExpressionPrinter,
  'literal-constant': kotlinLiteralConstantPrinter,
  'string-literal': kotlinStringLiteralPrinter,
  'type': kotlinTypePrinter,
  'type-reference': kotlinTypeReferencePrinter,
  'parenthesized-type': kotlinParenthesizedTypePrinter,
  'nullable-type': kotlinNullableTypePrinter,
}
