import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinDeclaration,
  KotlinFile,
  KotlinObjectDeclaration, KotlinPropertyDeclaration,
  KotlinVariableDeclaration
} from "../../syntax/kotlin";
import {kotlinFilePrinter} from "./general/file";
import {kotlinDeclarationPrinter} from "./general/declaration";
import {
  kotlinClassBodyPrinter,
  kotlinClassMemberDeclarationPrinter,
  kotlinObjectDeclarationPrinter
} from "./class/object-declaration";
import {
  kotlinAdditiveExpressionPrinter,
  kotlinAsExpressionPrinter, kotlinComparisonPrinter, kotlinConjunctionPrinter, kotlinDisjunctionPrinter,
  kotlinElvisExpressionPrinter, kotlinEqualityPrinter,
  kotlinExpressionPrinter, kotlinGenericCallLikeComparisonPrinter,
  kotlinInfixFunctionCallPrinter, kotlinInfixOperationPrinter,
  kotlinLiteralConstantPrinter,
  kotlinMultiplicativeExpressionPrinter,
  kotlinPostfixUnaryExpressionPrinter,
  kotlinPrefixUnaryExpressionPrinter,
  kotlinPrimaryExpressionPrinter, kotlinPropertyDeclarationPrinter,
  kotlinRangeExpressionPrinter,
  kotlinVariableDeclarationPrinter
} from "./class-members/property-declaration";
import {
  KotlinAdditiveExpression,
  KotlinAsExpression, KotlinComparison, KotlinConjunction, KotlinDisjunction,
  KotlinElvisExpression, KotlinEquality,
  KotlinExpression, KotlinGenericCallLikeComparison,
  KotlinInfixFunctionCall,
  KotlinInfixOperation,
  KotlinLiteralConstant,
  KotlinMultiplicativeExpression,
  KotlinPostfixUnaryExpression,
  KotlinPrefixUnaryExpression,
  KotlinPrimaryExpression,
  KotlinRangeExpression
} from "../../syntax/kotlin/expressions/expressions";

export type PrinterOutput = string[];
export type KotlinPrinter<T> = (table: KotlinPrinterTable, input: T, depth: number) => PrinterOutput;
export const kotlinIndent = "    ";

export interface KotlinPrinterTable {
  'file': KotlinPrinter<KotlinFile>,
  'declaration': KotlinPrinter<KotlinDeclaration>,
  'object-declaration': KotlinPrinter<KotlinObjectDeclaration>,
  'class-body': KotlinPrinter<KotlinClassBody>,
  'class-member-declaration': KotlinPrinter<KotlinClassMemberDeclaration>,
  'property-declaration': KotlinPrinter<KotlinPropertyDeclaration>,
  'variable-declaration': KotlinPrinter<KotlinVariableDeclaration>,
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
}

export const defaultKotlinPrinterTable: KotlinPrinterTable = {
  'file': kotlinFilePrinter,
  'declaration': kotlinDeclarationPrinter,
  'object-declaration': kotlinObjectDeclarationPrinter,
  'class-body': kotlinClassBodyPrinter,
  'class-member-declaration': kotlinClassMemberDeclarationPrinter,
  'property-declaration': kotlinPropertyDeclarationPrinter,
  'variable-declaration': kotlinVariableDeclarationPrinter,
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
}
