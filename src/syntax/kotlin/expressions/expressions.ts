import {KotlinPrimaryExpression} from "./primary-expression";

export interface KotlinExpression {
  disjunction: KotlinDisjunction,
}

export interface KotlinDisjunction {
  // conjunction ('||' conjunction)*
  conjunctions: KotlinConjunction[],
}

export interface KotlinConjunction {
  // equality ('&&' equality)*
  equalities: KotlinEquality[],
}

export interface KotlinEquality {
  // comparison (equalityOperator comparison)*
  comparison: KotlinComparison, // KotlinComparison[],
  nextComparisons: [KotlinEqualityOperator, KotlinComparison][],
}

export interface KotlinComparison {
  // genericCallLikeComparison (comparisonOperator genericCallLikeComparison)*
  genericCallLikeComparison: KotlinGenericCallLikeComparison,
  nextGenericCallLikeComparisons: [KotlinComparisonOperator, KotlinGenericCallLikeComparison][],
}

export interface KotlinEqualityOperator {
  type: '!=' | '!==' | '==' | '===',
}

export interface KotlinGenericCallLikeComparison {
  // infixOperation callSuffix*
  infixOperation: KotlinInfixOperation,
  // callSuffix: KotlinCallSuffix[],
}

export interface KotlinComparisonOperator {
  type: '<' | '>' | '<=' | '>=',
}

export interface KotlinInfixOperation {
  // elvisExpression ((inOperator elvisExpression) | (isOperator type))*
  elvisExpression: KotlinElvisExpression,
}

export interface KotlinElvisExpression {
  // infixFunctionCall (elvis infixFunctionCall)*
  infixFunctionCall: KotlinInfixFunctionCall,
  // nextInfixFunctionCalls: [KotlinInfixFunctionCall][],
}

export interface KotlinInfixFunctionCall {
  rangeExpression: KotlinRangeExpression,
  // nextRangeExpressions: [string, KotlinRangeExpression][],
}

export interface KotlinRangeExpression {
  // additiveExpression ('..' additiveExpression)*
  additiveExpression: KotlinAdditiveExpression,
}

export interface KotlinAdditiveExpression {
  // multiplicativeExpression (additiveOperator multiplicativeExpression)*
  multiplicativeExpression: KotlinMultiplicativeExpression,
}

export interface KotlinMultiplicativeExpression {
  // asExpression (multiplicativeOperator asExpression)*
  asExpression: KotlinAsExpression,
}

export interface KotlinAsExpression {
  // prefixUnaryExpression (asOperator type)*
  prefixUnaryExpression: KotlinPrefixUnaryExpression,
}

export interface KotlinPrefixUnaryExpression {
  // unaryPrefix* postfixUnaryExpression
  postfixUnaryExpression: KotlinPostfixUnaryExpression,
}

export interface KotlinPostfixUnaryExpression {
  // primaryExpression postfixUnarySuffix*
  primaryExpression: KotlinPrimaryExpression,
}
