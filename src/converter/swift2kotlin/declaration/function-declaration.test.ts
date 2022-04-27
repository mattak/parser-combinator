import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {
  KotlinExpression,
  KotlinFunctionDeclaration,
  KotlinFunctionValueParameter,
  KotlinFunctionValueParameters,
  KotlinParameter,
  KotlinType
} from "../../../syntax/kotlin";
import {
  SwiftExpression,
  SwiftFunctionDeclaration,
  SwiftFunctionHead,
  SwiftFunctionSignature,
  SwiftParameter,
  SwiftType,
  SwiftTypeAnnotation
} from "../../../syntax/swift";
import {
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

describe('convert_functionDeclaration_functionDeclaration', () => {
  const converter = convert_functionDeclaration_functionDeclaration;
  const signatureMock = jest.fn().mockImplementation(x => <KotlinFunctionValueParameters>[])
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'function-signature': signatureMock,
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
        functionBody: null,
      },
    );
  });
});
