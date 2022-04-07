// <constant-declaration> ::= <attributes>? <declaration-modifiers>? let <pattern-initializer-list>
// <pattern-initializer-list> ::= <pattern-initializer> | <pattern-initializer> (, <pattern-initializer>)+
// <pattern-initializer> ::= <pattern> <initializer>?
// <initializer> ::= <expression>

import {Parser} from "../../../types";
import {cat} from "../../../combinators";
import {list, map, opt, str} from "../../../util";
import {char} from "../../../char";
import {whitespace} from "../../json/whitespace";
import {pattern, SwiftPattern} from "../pattern/pattern";
import {SwiftDeclaration} from "./declaration";

export interface SwiftConstantDeclaration extends SwiftDeclaration {
  type: 'constant',
  patternInitializers: SwiftPatternInitializer[],
}

export interface SwiftPatternInitializer {
  pattern: SwiftPattern,
  initializer: SwiftInitializer | null,
}

export interface SwiftInitializer {
  // <expression>
  expression: null,
}

const initializer: Parser<SwiftInitializer> = map(
  cat([
    whitespace,
    char('='),
    whitespace,
    // <expression>
  ]),
  ([, ,]) => {
    return {
      expression: null, // FIXME
    }
  }
);

const patternInitializer: Parser<SwiftPatternInitializer> = map(
  cat([
    pattern,
    opt(initializer),
  ]),
  ([p, i]) => {
    return {
      pattern: p,
      initializer: i.status === 'some' ? i.value : null
    }
  });

export const constantDeclaration: Parser<SwiftConstantDeclaration> = map(
  cat([
    // attributes?
    // declaration-modifiers?
    str('let'),
    whitespace,
    list(patternInitializer, cat([whitespace, char(','), whitespace]))
  ]),
  ([, , initializers]) => {
    return {
      type: 'constant',
      patternInitializers: initializers,
    }
  });
