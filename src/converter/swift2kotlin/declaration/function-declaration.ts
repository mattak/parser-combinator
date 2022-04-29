import {SwiftKotlinConvertTable} from "../swift-converter";
import {
  SwiftFunctionBody,
  SwiftFunctionDeclaration,
  SwiftFunctionSignature,
  SwiftParameter
} from "../../../syntax/swift";
import {
  KotlinBlock,
  KotlinFunctionBody,
  KotlinFunctionBodyBlock,
  KotlinFunctionDeclaration,
  KotlinFunctionValueParameter,
  KotlinFunctionValueParameters,
  KotlinParameter,
  KotlinSimpleIdentifier
} from "../../../syntax/kotlin";

export function convert_functionDeclaration_functionDeclaration(
  table: SwiftKotlinConvertTable,
  input: SwiftFunctionDeclaration,
): KotlinFunctionDeclaration {
  return <KotlinFunctionDeclaration>{
    name: <KotlinSimpleIdentifier>{value: input.name},
    parameters: table['function-signature'](table, input.signature),
    returnType: null,
    body: input.body !== null ? table['function-body'](table, input.body) : null,
  }
}

export function convert_functionSignature_functionValueParameters(
  table: SwiftKotlinConvertTable,
  input: SwiftFunctionSignature,
): KotlinFunctionValueParameters {
  return input.parameters.map(x => table['parameter__functionValueParameter'](table, x));
}

export function convert_parameter_functionValueParameter(
  table: SwiftKotlinConvertTable,
  input: SwiftParameter,
): KotlinFunctionValueParameter {
  return <KotlinFunctionValueParameter>{
    parameter: table['parameter__parameter'](table, input),
    expression: input.defaultArgument === null ? null : table['expression'](table, input.defaultArgument),
  };
}

export function convert_parameter_parameter(
  table: SwiftKotlinConvertTable,
  input: SwiftParameter,
): KotlinParameter {
  return <KotlinParameter>{
    key: <KotlinSimpleIdentifier>{value: input.localName},
    type: table['type-annotation__type'](table, input.type)
  }
}

export function convert_functionBody_functionBody(
  table: SwiftKotlinConvertTable,
  input: SwiftFunctionBody,
): KotlinFunctionBody {
  const statements = input.statements
    .flatMap(x => table['statement__statements'](table, x));
  return <KotlinFunctionBodyBlock>{
    type: "block",
    value: <KotlinBlock>{
      statements: statements,
    },
  }
}
