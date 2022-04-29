import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {
  KotlinBlock,
  KotlinExpression, KotlinFunctionBody, KotlinFunctionBodyBlock,
  KotlinFunctionDeclaration,
  KotlinFunctionValueParameter,
  KotlinFunctionValueParameters,
  KotlinParameter, KotlinStatement, KotlinStatementDeclaration,
  KotlinType
} from "../../../syntax/kotlin";
import {
  SwiftDeclaration,
  SwiftExpression, SwiftFunctionBody,
  SwiftFunctionDeclaration,
  SwiftFunctionHead,
  SwiftFunctionSignature,
  SwiftParameter, SwiftStatement, SwiftStatementDeclaration, SwiftStatementType,
  SwiftType,
  SwiftTypeAnnotation
} from "../../../syntax/swift";
import {
  convert_functionBody_functionBody,
  convert_functionDeclaration_functionDeclaration,
  convert_parameter_functionValueParameter,
  convert_parameter_parameter
} from "./function-declaration";

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
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'function-signature': signatureMock,
    'function-body': functionMock,
  }

  test('func run(key:Type){}', () => {
    const input = <SwiftFunctionDeclaration>{
      type: 'function',
      head: <SwiftFunctionHead>{},
      name: 'run',
      signature: <SwiftFunctionSignature>{},
      genericWhere: null,
      body: null,
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFunctionDeclaration>(
      <KotlinFunctionDeclaration>{
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
      head: <SwiftFunctionHead>{},
      name: 'run',
      signature: <SwiftFunctionSignature>{},
      genericWhere: null,
      body: <SwiftFunctionBody>{},
    };
    const output = converter(table, input);
    expect(output).toEqual<KotlinFunctionDeclaration>(
      <KotlinFunctionDeclaration>{
        name: {value: 'run'},
        parameters: [],
        returnType: null,
        body: <KotlinFunctionBody>{},
      },
    );
  });
});
