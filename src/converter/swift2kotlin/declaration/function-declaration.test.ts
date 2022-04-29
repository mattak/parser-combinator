import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {
  KotlinBlock,
  KotlinExpression,
  KotlinFunctionBody,
  KotlinFunctionBodyBlock,
  KotlinFunctionDeclaration,
  KotlinFunctionValueParameter,
  KotlinFunctionValueParameters,
  KotlinModifier,
  KotlinModifiers,
  KotlinParameter,
  KotlinStatement,
  KotlinType
} from "../../../syntax/kotlin";
import {
  SwiftDeclaration,
  SwiftDeclarationModifier,
  SwiftExpression,
  SwiftFunctionBody,
  SwiftFunctionDeclaration,
  SwiftFunctionHead,
  SwiftFunctionResult,
  SwiftFunctionSignature,
  SwiftParameter,
  SwiftStatement,
  SwiftStatementDeclaration,
  SwiftType,
  SwiftTypeAnnotation
} from "../../../syntax/swift";
import {
  convert_functionBody_functionBody,
  convert_functionDeclaration_functionDeclaration,
  convert_functionHead_modifiers,
  convert_functionResult_type,
  convert_parameter_functionValueParameter,
  convert_parameter_parameter
} from "./function-declaration";


describe('convert_functionHead_modifiers', () => {
  const converter = convert_functionHead_modifiers;
  const mockNull = jest.fn().mockImplementation(() => null)
  const mockModifier = jest.fn().mockImplementation(() => <KotlinModifier>{})

  test('empty', () => {
    const input = <SwiftFunctionHead>{
      modifiers: [],
    };
    const table = <SwiftKotlinConvertTable>{
      ...defaultSwiftKotlinConvertTable,
      'declaration-modifier': mockNull,
    }
    const output = converter(table, input);
    expect(output).toEqual<KotlinModifiers>([]);
  });

  test('null', () => {
    const input = <SwiftFunctionHead>{
      modifiers: [<SwiftDeclarationModifier>{}],
    };
    const table = <SwiftKotlinConvertTable>{
      ...defaultSwiftKotlinConvertTable,
      'declaration-modifier': mockNull,
    }
    const output = converter(table, input);
    expect(output).toEqual<KotlinModifiers>([]);
  });

  test('default', () => {
    const input = <SwiftFunctionHead>{
      modifiers: [<SwiftDeclarationModifier>{}],
    };
    const table = <SwiftKotlinConvertTable>{
      ...defaultSwiftKotlinConvertTable,
      'declaration-modifier': mockModifier,
    }
    const output = converter(table, input);
    expect(output).toEqual<KotlinModifiers>([<KotlinModifier>{}]);
  });
});

describe('convert_parameter_functionValueParameter', () => {
  const converter = convert_parameter_functionValueParameter;
  const parameterMock = jest.fn().mockImplementation(x => <KotlinParameter>{})
  const expressionMock = jest.fn().mockImplementation(x => <SwiftExpression>{})
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'parameter__parameter': parameterMock,
    'expression': expressionMock,
  }

  test('key:Type', () => {
    const input = <SwiftParameter>{
      externalName: null,
      localName: 'key',
      type: <SwiftTypeAnnotation>{
        attributes: null,
        isInout: false,
        type: <SwiftType>{},
      },
      defaultArgument: null,
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFunctionValueParameter>(
      <KotlinFunctionValueParameter>{
        parameter: <KotlinParameter>{},
        expression: null,
      }
    );
  });

  test('key:Type = 1', () => {
    const input = <SwiftParameter>{
      externalName: null,
      localName: 'key',
      type: <SwiftTypeAnnotation>{
        attributes: null,
        isInout: false,
        type: <SwiftType>{},
      },
      defaultArgument: <SwiftExpression>{},
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFunctionValueParameter>(
      <KotlinFunctionValueParameter>{
        parameter: <KotlinParameter>{},
        expression: <KotlinExpression>{},
      }
    );
  });
});

describe('convert_parameter_parameter', () => {
  const converter = convert_parameter_parameter;
  const typeAnnotationMock = jest.fn().mockImplementation(x => <KotlinType>{})
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'type-annotation__type': typeAnnotationMock,
  }

  test('key:Type', () => {
    const input = <SwiftParameter>{
      externalName: null,
      localName: 'key',
      type: <SwiftTypeAnnotation>{
        attributes: null,
        isInout: false,
        type: <SwiftType>{},
      },
      defaultArgument: null,
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinParameter>(
      <KotlinParameter>{
        key: {value: 'key'},
        type: <KotlinType>{},
      },
    );
  });
});

describe('convert_functionResult_type', () => {
  const converter = convert_functionResult_type;
  const mock = jest.fn().mockImplementation(x => <KotlinType>{})
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'type': mock,
  }

  test('result', () => {
    const input = <SwiftFunctionResult>{
      type: <SwiftType>{
        type: "type-identifier",
      }
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinType>(<KotlinType>{});
  });
});

describe('convert_functionBody_functionBody', () => {
  const converter = convert_functionBody_functionBody;
  const stMock = jest.fn().mockImplementation(x => <SwiftStatement[]>[
    <SwiftStatement>{},
    <SwiftStatement>{},
  ])
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'statement__statements': stMock,
  }

  test('block: empty', () => {
    const input = <SwiftFunctionBody>{
      statements: [],
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFunctionBodyBlock>({
      type: 'block',
      value: <KotlinBlock>{
        statements: [],
      },
    });
  });

  test('block', () => {
    const input = <SwiftFunctionBody>{
      statements: [
        <SwiftStatementDeclaration>{
          type: 'declaration',
          value: <SwiftDeclaration>{},
        },
      ],
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFunctionBodyBlock>({
      type: 'block',
      value: <KotlinBlock>{
        statements: [
          <KotlinStatement>{},
          <KotlinStatement>{},
        ],
      },
    });
  });
});

describe('convert_functionDeclaration_functionDeclaration', () => {
  const converter = convert_functionDeclaration_functionDeclaration;
  const signatureMock = jest.fn().mockImplementation(x => <KotlinFunctionValueParameters>[])
  const functionMock = jest.fn().mockImplementation(x => <KotlinFunctionBody>{})
  const resultMock = jest.fn().mockImplementation(x => <KotlinType>{})
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'function-signature': signatureMock,
    'function-body': functionMock,
    'function-result': resultMock,
  }

  test('func run(key:Type){}', () => {
    const input = <SwiftFunctionDeclaration>{
      type: 'function',
      head: <SwiftFunctionHead>{modifiers: []},
      name: 'run',
      signature: <SwiftFunctionSignature>{result: null},
      genericWhere: null,
      body: null,
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFunctionDeclaration>(
      <KotlinFunctionDeclaration>{
        modifiers: [],
        name: {value: 'run'},
        parameters: [],
        returnType: null,
        body: null,
      },
    );
  });

  test('func run(key:Type){ <statement> }', () => {
    const input = <SwiftFunctionDeclaration>{
      type: 'function',
      head: <SwiftFunctionHead>{modifiers: []},
      name: 'run',
      signature: <SwiftFunctionSignature>{result: null},
      genericWhere: null,
      body: <SwiftFunctionBody>{},
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFunctionDeclaration>(
      <KotlinFunctionDeclaration>{
        modifiers: [],
        name: {value: 'run'},
        parameters: [],
        returnType: null,
        body: <KotlinFunctionBody>{},
      },
    );
  });

  test('func run() Sample {}', () => {
    const input = <SwiftFunctionDeclaration>{
      type: 'function',
      head: <SwiftFunctionHead>{modifiers: []},
      name: 'run',
      signature: <SwiftFunctionSignature>{result: <SwiftFunctionResult>{}},
      genericWhere: null,
      body: <SwiftFunctionBody>{},
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFunctionDeclaration>(
      <KotlinFunctionDeclaration>{
        modifiers: [],
        name: {value: 'run'},
        parameters: [],
        returnType: <KotlinType>{},
        body: <KotlinFunctionBody>{},
      },
    );
  });
});
