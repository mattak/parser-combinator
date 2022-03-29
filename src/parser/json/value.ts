import {list, map, opt, str} from "../../util";
import {Parser, ParserInput, ParserOutput} from "../../types";
import {cat, or} from "../../combinators";
import {bool} from "../bool";
import {number} from "./number";
import {string} from "./string";
import {whitespace} from "./whitespace";
import {char} from "../../char";

export type ValueType = string | number | boolean | null | ValueType[] | ObjectType;

// <null> ::= 'null'
const parseNull: Parser<null> = map(str('null'), () => null);

// <value> ::= <string> | <number> | <boolean> | <null> | <array>
const valueContent: Parser<ValueType> = or<ValueType>([
  string, number, bool, parseNull, array, object,
]);

// <value> ::= <whitespace> <valueContent> <whitespace>
export function value(input: ParserInput): ParserOutput<ValueType> {
  return map(
    cat([
      whitespace,
      valueContent,
      whitespace,
    ]),
    ([, v,]) => v)(input);
}

// <arrayContent> ::= <value> (',' <value>)*
const arrayContent: Parser<ValueType[]> = map(
  or([
    list(value, char(',')),
    whitespace
  ]),
  a => a ?? []
);

// <array> ::= '[' <arrayContent> ']'
export function array(input: ParserInput): ParserOutput<ValueType[]> {
  return map(
    cat([
      char('['),
      arrayContent,
      char(']'),
    ]),
    ([, a,]) => a
  )(input);
}

export type ObjectType = { [key: string]: ValueType };
// <objectKeyValue> ::= <whitespace> <string> <whitespace> ':' <value>
const objectKeyValue: Parser<ObjectType> = map(
  cat([
    whitespace,
    string,
    whitespace,
    char(':'),
    value,
  ]),
  ([, k, , , v]) => ({[k]: v})
);

// <objectContent> ::= (<objectKeyValue> (',' <objectKeyValue>)*) | <whitespace>
const objectContent: Parser<ObjectType> = map(
  or([
    list(objectKeyValue, char(',')),
    whitespace,
  ]),
  a => (a ?? [])
    .reduce((obj, kv) => ({
      ...obj, ...kv
    }), {})
);

// <object> ::= '{' <objectContent> '}'
export function object(input: ParserInput): ParserOutput<ObjectType> {
  return map(
    cat([
      char('{'),
      objectContent,
      char('}'),
    ]),
    ([, o,]) => o
  )(input);
}
