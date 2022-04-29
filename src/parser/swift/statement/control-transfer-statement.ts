import {ParserInput, ParserOutput} from "../../../types";
import {
  SwiftBreakStatement,
  SwiftContinueStatement,
  SwiftControlTransferStatement,
  SwiftFallthroughStatement,
  SwiftReturnStatement,
  SwiftThrowStatement
} from "../../../syntax/swift";
import {cat, or} from "../../../combinators";
import {map, opt, str} from "../../../util";
import {expression} from "../expression/expression";
import {identifier} from "../lexical-struct/identifier";
import {whitespace} from "../lexical-struct/whitespace";

export function controlTransferStatement(input: ParserInput): ParserOutput<SwiftControlTransferStatement> {
  return or<SwiftControlTransferStatement>([
    returnExpression,
    breakExpression,
    fallthroughExpression,
    continueExpression,
    throwExpression,
  ])(input)
}

export function returnExpression(input: ParserInput): ParserOutput<SwiftReturnStatement> {
  return map(
    cat([
      str('return'),
      opt(cat([whitespace, expression]))
    ]),
    ([, opt]) => <SwiftReturnStatement>{
      type: 'return',
      expression: opt.status === 'some' ? opt.value[1] : null,
    }
  )(input);
}

export function breakExpression(input: ParserInput): ParserOutput<SwiftBreakStatement> {
  return map(
    cat([
      str('break'),
      opt(cat([whitespace, identifier]))
    ]),
    ([, opt]) => <SwiftBreakStatement>{
      type: 'break',
      label: opt.status === 'some' ? opt.value[1] : null,
    }
  )(input);
}

export function fallthroughExpression(input: ParserInput): ParserOutput<SwiftFallthroughStatement> {
  return map(
    cat([
      str('fallthrough'),
      opt(cat([whitespace, identifier]))
    ]),
    ([, opt]) => <SwiftFallthroughStatement>{
      type: 'fallthrough',
    }
  )(input);
}

export function continueExpression(input: ParserInput): ParserOutput<SwiftContinueStatement> {
  return map(
    cat([
      str('continue'),
      opt(cat([whitespace, identifier]))
    ]),
    ([, opt]) => <SwiftContinueStatement>{
      type: 'continue',
      label: opt.status === 'some' ? opt.value[1] : null,
    }
  )(input);
}

export function throwExpression(input: ParserInput): ParserOutput<SwiftThrowStatement> {
  return map(
    cat([
      str('throw'),
      whitespace,
      expression,
    ]),
    ([, , ex]) => <SwiftThrowStatement>{
      type: 'throw',
      expression: ex,
    }
  )(input);
}
