import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinPropertyDeclaration, KotlinVariableDeclaration} from "../../../syntax/kotlin";
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
  KotlinPrimaryExpressionLiteralConstant,
  KotlinRangeExpression
} from "../../../syntax/kotlin/expressions/expressions";

export function kotlinPropertyDeclarationPrinter(table: KotlinPrinterTable, input: KotlinPropertyDeclaration, depth: number): PrinterOutput {
  const declaration = table['variable-declaration'](table, input.variableDeclaration, depth);
  const expression = input.expression !== null
    ? ['=', ...table['expression'](table, input.expression, depth)]
    : [];

  const line = [
    input.type,
    ...declaration,
    ...expression,
  ].join(' ');
  return [
    line
  ];
}

export function kotlinVariableDeclarationPrinter(table: KotlinPrinterTable, input: KotlinVariableDeclaration, depth: number): PrinterOutput {
  return [
    input.name
  ];
}

export function kotlinExpressionPrinter(table: KotlinPrinterTable, input: KotlinExpression, depth: number): PrinterOutput {
  return table['disjunction'](table, input.disjunction, depth);
}

export function kotlinDisjunctionPrinter(table: KotlinPrinterTable, input: KotlinDisjunction, depth: number): PrinterOutput {
  return [
    input.conjunctions.map(x => table['conjunction'](table, x, depth).join(' ')).join(' || '),
  ];
}

export function kotlinConjunctionPrinter(table: KotlinPrinterTable, input: KotlinConjunction, depth: number): PrinterOutput {
  return [
    input.equalities.map(x => table['equality'](table, x, depth).join(' ')).join(' && ')
  ];
}

export function kotlinEqualityPrinter(table: KotlinPrinterTable, input: KotlinEquality, depth: number): PrinterOutput {
  return [
    table['comparison'](table, input.comparison, depth).join(' '),
    ...input.nextComparisons.map(([operator, comparison]) => {
      return operator.type.toString() + " " + table['comparison'](table, comparison, depth).join(' ')
    }),
  ];
}

export function kotlinComparisonPrinter(table: KotlinPrinterTable, input: KotlinComparison, depth: number): PrinterOutput {
  return [
    table['generic-call-like-comparison'](table, input.genericCallLikeComparison, depth).join(' '),
    ...input.nextGenericCallLikeComparisons.map(([operator, comparison]) => {
      return operator.type.toString() + " " + table['generic-call-like-comparison'](table, comparison, depth).join(' ')
    })
  ];
}

export function kotlinGenericCallLikeComparisonPrinter(table: KotlinPrinterTable, input: KotlinGenericCallLikeComparison, depth: number): PrinterOutput {
  return [
    ...table['infix-operation'](table, input.infixOperation, depth)
  ]
}

export function kotlinInfixOperationPrinter(table: KotlinPrinterTable, input: KotlinInfixOperation, depth: number): PrinterOutput {
  return [
    ...table['elvis-expression'](table, input.elvisExpression, depth)
  ]
}

export function kotlinElvisExpressionPrinter(table: KotlinPrinterTable, input: KotlinElvisExpression, depth: number): PrinterOutput {
  return [
    ...table['infix-function-call'](table, input.infixFunctionCall, depth)
  ]
}

export function kotlinInfixFunctionCallPrinter(table: KotlinPrinterTable, input: KotlinInfixFunctionCall, depth: number): PrinterOutput {
  return [
    ...table['range-expression'](table, input.rangeExpression, depth),
  ]
}

export function kotlinRangeExpressionPrinter(table: KotlinPrinterTable, input: KotlinRangeExpression, depth: number): PrinterOutput {
  return [
    ...table['additive-expression'](table, input.additiveExpression, depth)
  ]
}

export function kotlinAdditiveExpressionPrinter(table: KotlinPrinterTable, input: KotlinAdditiveExpression, depth: number): PrinterOutput {
  return [
    ...table['multiplicative-expression'](table, input.multiplicativeExpression, depth)
  ]
}

export function kotlinMultiplicativeExpressionPrinter(table: KotlinPrinterTable, input: KotlinMultiplicativeExpression, depth: number): PrinterOutput {
  return [
    ...table['as-expression'](table, input.asExpression, depth),
  ]
}

export function kotlinAsExpressionPrinter(table: KotlinPrinterTable, input: KotlinAsExpression, depth: number): PrinterOutput {
  return [
    ...table['prefix-unary-expression'](table, input.prefixUnaryExpression, depth)
  ]
}

export function kotlinPrefixUnaryExpressionPrinter(table: KotlinPrinterTable, input: KotlinPrefixUnaryExpression, depth: number): PrinterOutput {
  return [
    ...table['postfix-unary-expression'](table, input.postfixUnaryExpression, depth),
  ]
}

export function kotlinPostfixUnaryExpressionPrinter(table: KotlinPrinterTable, input: KotlinPostfixUnaryExpression, depth: number): PrinterOutput {
  return [
    ...table['primary-expression'](table, input.primaryExpression, depth)
  ]
}

export function kotlinPrimaryExpressionPrinter(table: KotlinPrinterTable, input: KotlinPrimaryExpression, depth: number): PrinterOutput {
  switch (input.type) {
    // case 'parenthesizedExpression':
    // case 'simpleIdentifier':
    case 'literalConstant':
      return table['literal-constant'](table, (<KotlinPrimaryExpressionLiteralConstant>input).value, depth)
    // case 'stringLiteral':
    // case 'callableReference':
    // case 'functionLiteral':
    // case 'objectLiteral':
    // case 'collectionLiteral':
    // case 'thisExpression':
    // case 'superExpression':
    // case 'ifExpression':
    // case 'whenExpression':
    // case 'tryExpression':
    // case 'jumpExpression':
    //   break
    default:
      throw Error(`not implemented type ${input.type}`)
  }
}

export function kotlinLiteralConstantPrinter(table: KotlinPrinterTable, input: KotlinLiteralConstant, depth: number): PrinterOutput {
  switch (input.type) {
    case 'boolean':
      return [
        input.value.toString(),
      ]
    case 'integer':
      return [
        input.value.toString(),
      ]
    // case 'hex':
    // case 'bin':
    case 'character':
      return [
        input.value
      ]
    // case 'real':
    case 'null':
      return ['null']
    // case 'long':
    // case 'unsigned':
    default:
      throw new Error(`Not handled type: ${JSON.stringify(input, null, 2)}`);
  }
}