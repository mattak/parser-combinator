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
  kotlinLiteralConstantPrinter,
  kotlinMultiplicativeExpressionPrinter,
  kotlinPostfixUnaryExpressionPrinter,
  kotlinPrefixUnaryExpressionPrinter,
  kotlinPrimaryExpressionPrinter, kotlinPropertyDeclarationPrinter,
  kotlinRangeExpressionPrinter, kotlinVariableDeclarationPrinter
} from "./property-declaration";
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
  KotlinPrimaryExpressionLiteralConstant,
  KotlinRangeExpression
} from "../../../syntax/kotlin/expressions/expressions";
import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinPropertyDeclaration, KotlinVariableDeclaration} from "../../../syntax/kotlin";

describe('kotlinPropertyDeclarationPrinter', () => {
  const printer = kotlinPropertyDeclarationPrinter;
  const varMock = jest.fn().mockImplementation(() => ['value']);
  const exMock = jest.fn().mockImplementation(() => ['null']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'variable-declaration': varMock,
    'expression': exMock,
  };

  beforeEach(() => {
    varMock.mockClear();
    exMock.mockClear();
  })

  test('null expression', () => {
    const input = <KotlinPropertyDeclaration>{
      type: 'val',
      variableDeclaration: <KotlinVariableDeclaration>{},
      expression: null,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['val value']);
    expect(varMock).toHaveBeenCalledTimes(1);
  });

  test('with expression', () => {
    const input = <KotlinPropertyDeclaration>{
      type: 'var',
      variableDeclaration: <KotlinVariableDeclaration>{},
      expression: <KotlinExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['var value = null']);
    expect(varMock).toHaveBeenCalledTimes(1);
    expect(exMock).toHaveBeenCalledTimes(1);
  });
});

describe('kotlinVariableDeclarationPrinter', () => {
  const printer = kotlinVariableDeclarationPrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
  };

  test('default', () => {
    const input = <KotlinVariableDeclaration>{
      name: 'value',
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['value']);
  });
});

describe('kotlinExpressionPrinter', () => {
  const printer = kotlinExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => ['null']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'disjunction': mock,
  };

  test('default', () => {
    const input = <KotlinExpression>{
      disjunction: <KotlinDisjunction>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['null']);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinDisjunctionPrinter', () => {
  const printer = kotlinDisjunctionPrinter;
  const mock = jest.fn().mockImplementation(() => ['true']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'conjunction': mock,
  };

  test('default', () => {
    const input = <KotlinDisjunction>{
      conjunctions: [<KotlinConjunction>{}]
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['true']);
    expect(mock).toHaveBeenCalled();
  });

  test('multiple', () => {
    const input = <KotlinDisjunction>{
      conjunctions: [<KotlinConjunction>{}, <KotlinConjunction>{}]
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['true || true']);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinConjunctionPrinter', () => {
  const printer = kotlinConjunctionPrinter;
  const mock = jest.fn().mockImplementation(() => ['true']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'equality': mock,
  };

  test('default', () => {
    const input = <KotlinConjunction>{
      equalities: [<KotlinEquality>{}]
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['true']);
    expect(mock).toHaveBeenCalled();
  });

  test('multiple', () => {
    const input = <KotlinConjunction>{
      equalities: [<KotlinEquality>{}, <KotlinEquality>{}]
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['true && true']);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinEqualityPrinter', () => {
  const printer = kotlinEqualityPrinter;
  const mock = jest.fn().mockImplementation(() => ['null']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'comparison': mock,
  };

  test('default', () => {
    const input = <KotlinEquality>{
      comparison: <KotlinComparison>{},
      nextComparisons: [],
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['null']);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinComparisonPrinter', () => {
  const printer = kotlinComparisonPrinter;
  const mock = jest.fn().mockImplementation(() => ['null']);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'generic-call-like-comparison': mock,
  };

  test('default', () => {
    const input = <KotlinComparison>{
      genericCallLikeComparison: <KotlinGenericCallLikeComparison>{
        infixOperation: <KotlinInfixOperation>{},
      },
      nextGenericCallLikeComparisons: [],
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['null']);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinGenericCallLikeComparisonPrinter', () => {
  const printer = kotlinGenericCallLikeComparisonPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'infix-operation': mock,
  };

  test('default', () => {
    const input = <KotlinGenericCallLikeComparison>{
      infixOperation: <KotlinInfixOperation>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinInfixOperationPrinter', () => {
  const printer = kotlinInfixOperationPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'elvis-expression': mock,
  };

  test('default', () => {
    const input = <KotlinInfixOperation>{
      elvisExpression: <KotlinElvisExpression>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinElvisExpressionPrinter', () => {
  const printer = kotlinElvisExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'infix-function-call': mock,
  };

  test('default', () => {
    const input = <KotlinElvisExpression>{
      infixFunctionCall: <KotlinInfixFunctionCall>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinInfixFunctionCallPrinter', () => {
  const printer = kotlinInfixFunctionCallPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'range-expression': mock,
  };

  test('default', () => {
    const input = <KotlinInfixFunctionCall>{
      rangeExpression: <KotlinRangeExpression>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinRangeExpressionPrinter', () => {
  const printer = kotlinRangeExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'additive-expression': mock,
  };

  test('default', () => {
    const input = <KotlinRangeExpression>{
      additiveExpression: <KotlinAdditiveExpression>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinAdditiveExpressionPrinter', () => {
  const printer = kotlinAdditiveExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'multiplicative-expression': mock,
  };

  test('default', () => {
    const input = <KotlinAdditiveExpression>{
      multiplicativeExpression: <KotlinMultiplicativeExpression>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinMultiplicativeExpressionPrinter', () => {
  const printer = kotlinMultiplicativeExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'as-expression': mock,
  };

  test('default', () => {
    const input = <KotlinMultiplicativeExpression>{
      asExpression: <KotlinAsExpression>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinAsExpressionPrinter', () => {
  const printer = kotlinAsExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'prefix-unary-expression': mock,
  };

  test('default', () => {
    const input = <KotlinAsExpression>{
      prefixUnaryExpression: <KotlinPrefixUnaryExpression>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinPrefixUnaryExpressionPrinter', () => {
  const printer = kotlinPrefixUnaryExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'postfix-unary-expression': mock,
  };

  test('default', () => {
    const input = <KotlinPrefixUnaryExpression>{
      postfixUnaryExpression: <KotlinPostfixUnaryExpression>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinPostfixUnaryExpressionPrinter', () => {
  const printer = kotlinPostfixUnaryExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'primary-expression': mock,
  };

  test('default', () => {
    const input = <KotlinPostfixUnaryExpression>{
      primaryExpression: <KotlinPrimaryExpressionLiteralConstant>{}
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('kotlinPrimaryExpressionPrinter', () => {
  const printer = kotlinPrimaryExpressionPrinter;
  const mock = jest.fn().mockImplementation(() => []);
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'literal-constant': mock,
  };

  test('literalConstant', () => {
    const input = <KotlinPrimaryExpressionLiteralConstant>{
      type: 'literalConstant',
      value: <KotlinLiteralConstant>{
        type: 'null',
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>([]);
    expect(mock).toHaveBeenCalled();
  });
});

describe('literalConstant', () => {
  const printer = kotlinLiteralConstantPrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
  };

  test('null', () => {
    const input = <KotlinLiteralConstant>{
      type: 'null',
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['null']);
  });
});
