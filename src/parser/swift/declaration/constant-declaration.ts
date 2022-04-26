// <constant-declaration> ::= <attributes>? <declaration-modifiers>? let <pattern-initializer-list>
// <pattern-initializer-list> ::= <pattern-initializer> | <pattern-initializer> (, <pattern-initializer>)+
// <pattern-initializer> ::= <pattern> <initializer>?
// <initializer> ::= <expression>

import {Parser, ParserInput, ParserOutput} from "../../../types";
import {cat} from "../../../combinators";
import {list, map, opt, str} from "../../../util";
import {char} from "../../../char";
import {pattern} from "../pattern/pattern";
import {whitespace, whitespace0} from "../lexical-struct/whitespace";
import {expression} from "../expression/expression";
import {SwiftConstantDeclaration, SwiftInitializer, SwiftPatternInitializer} from "../../../syntax/swift";

const initializer: Parser<SwiftInitializer> = input => {
  return map(
    cat([
      whitespace0,
      char('='),
      whitespace0,
      expression
    ]),
    ([, , , ex]) => {
      return ex
    }
  )(input);
}

const patternInitializer: Parser<SwiftPatternInitializer> = input => {
  return map(
    cat([
      pattern,
      opt(initializer),
    ]),
    ([p, i]) => {
      return {
        pattern: p,
        initializer: i.status === 'some' ? i.value : null
      }
    })(input);
}

export function constantDeclaration(input: ParserInput): ParserOutput<SwiftConstantDeclaration> {
  return map(
    cat([
      // attributes?
      // declaration-modifiers?
      str('let'),
      whitespace,
      list(patternInitializer, cat([whitespace0, char(','), whitespace0]))
    ]),
    ([_let, _space, initializers]) => {
      return <SwiftConstantDeclaration>{
        type: 'constant',
        patternInitializers: initializers,
      }
    }
  )(input);
}
