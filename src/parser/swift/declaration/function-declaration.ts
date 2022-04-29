// <function-declaration> ::= <function-head> <function-name> <generic-parameter-clause>? <function-signature> <generic-where-clause>? <function-body>?
import {ParserInput, ParserOutput} from "../../../types";
import {cat} from "../../../combinators";
import {
  SwiftFunctionBody,
  SwiftFunctionDeclaration,
  SwiftFunctionHead,
  SwiftFunctionName,
  SwiftFunctionResult,
  SwiftFunctionSignature,
  SwiftParameter,
  SwiftParameterClause,
  SwiftParameterList,
  SwiftStatement
} from "../../../syntax/swift";
import {list0, map, opt, str} from "../../../util";
import {whitespace, whitespace0} from "../lexical-struct/whitespace";
import {identifier} from "../lexical-struct/identifier";
import {char} from "../../../char";
import {typeAnnotation} from "../type/type-annotation";
import {expression} from "../expression/expression";
import {codeBlock} from "./code-block";
import {type} from "../type/type";

export function functionDeclaration(input: ParserInput): ParserOutput<SwiftFunctionDeclaration> {
  // <function-declaration> ::=
  //   <function-head> <function-name> <generic-parameter-clause>?
  //   <function-signature> <generic-where-clause>? <function-body>?
  return map(
    cat([
      functionHead, // head
      whitespace,
      functionName, // name
      whitespace0,
      // genericParameterClause,
      functionSignature,
      whitespace0,
      // genericWhereClause,
      functionBody,
    ]),
    ([head, , name, , signature, , body]) => {
      return <SwiftFunctionDeclaration>{
        type: 'function',
        head: head,
        name: name,
        // <generic-parameter-clause>?
        signature: signature,
        genericWhere: null,
        body: body,
      }
    })(input);
}

export function functionHead(input: ParserInput): ParserOutput<SwiftFunctionHead> {
  return map(
    cat([
      // attributes?
      // declaration-modifiers?
      str('func'),
    ]),
    () => <SwiftFunctionHead>{},
  )(input);
}

export function functionName(input: ParserInput): ParserOutput<SwiftFunctionName> {
  return identifier(input)
}

export function functionSignature(input: ParserInput): ParserOutput<SwiftFunctionSignature> {
  return map(
    cat([
      parameterClause,
      opt(cat([whitespace, str('async'),])),
      opt(cat([whitespace, str('throws')])),
      opt(cat([whitespace, functionResult])),
    ]),
    ([params, isAsync, isThrows, result]) => <SwiftFunctionSignature>{
      parameters: params,
      isAsync: isAsync.status === 'some',
      isThrows: isThrows.status === 'some',
      result: result.status === 'some' ? result.value[1] : null,
    })(input);
}

export function functionResult(input: ParserInput): ParserOutput<SwiftFunctionResult> {
  return map(
    type,
    (t) => <SwiftFunctionResult>{
      type: t,
    },
  )(input);
}

export function functionBody(input: ParserInput): ParserOutput<SwiftFunctionBody> {
  return map(
    codeBlock,
    (statements: SwiftStatement[]) => <SwiftFunctionBody>{
      statements: statements,
    })(input);
}

export function parameterClause(input: ParserInput): ParserOutput<SwiftParameterClause> {
  return map(
    cat([
      char('('),
      parameterList,
      char(')'),
    ]),
    ([, params,]) => params
  )(input);
}

export function parameterList(input: ParserInput): ParserOutput<SwiftParameterList> {
  return list0(parameter, cat([whitespace0, char(','), whitespace0]))(input);
}

export function parameter(input: ParserInput): ParserOutput<SwiftParameter> {
  // <parameter> ::= <external-parameter-name>? <local-parameter-name> <type-annotation> <default-argument-clause>?
  // <parameter> ::= <external-parameter-name>? <local-parameter-name> <type-annotation>
  // <parameter> ::= <external-parameter-name>? <local-parameter-name> <type-annotation> ...
  return map(
    cat([
      opt(cat([identifier, whitespace])), // external-parameter-name
      identifier, // local-parameter-name
      whitespace0,
      typeAnnotation,
      whitespace0,
      opt(cat([char('='), whitespace0, expression]))
    ]),
    ([externalParameterName, localParameterName, , typeAnnotation, , defaultArgumentClause]) => <SwiftParameter>{
      externalName: externalParameterName.status === 'some' ? externalParameterName.value[0] : null,
      localName: localParameterName,
      type: typeAnnotation,
      defaultArgument: defaultArgumentClause.status === 'some' ? defaultArgumentClause.value[2] : null,
    }
  )(input);
}