import {ParserInput, ParserOutput} from "../types";
import {cat, or, rep} from "../combinators";
import {map} from "../util";
import {char} from "../char";
import {numbers} from "./int";

// <expr> ::= <term> [("+"|"-") <term>]*
export function expr(input: ParserInput): ParserOutput<number> {
  return map(
    cat([
      term,
      rep(
        cat([
          or([char('+'), char('-')]),
          term
        ])
      )
    ]),
    ([first, rest]) => {
      return rest.reduce((lhs, [op, rhs]) => {
        if (op === '+') return lhs + rhs;
        return lhs - rhs;
      }, first);
    })(input);
}

// <<term>> :: <factor> [ ('*' | '/') <factor> ]*
function term(input: ParserInput): ParserOutput<number> {
  return map(
    cat([
      factor,
      rep(cat([
          or([char('*'), char('/')]),
          factor
        ]
      ))
    ]),
    ([first, rest]) => {
      return rest.reduce((lhs, [op, rhs]) => {
        if (op === '*') return lhs * rhs;
        return lhs / rhs;
      }, first);
    }
  )(input);
}

// <<factor>> :: <numbers> | '(' expr ')'
function factor(input: ParserInput): ParserOutput<number> {
  return or([
    numbers,
    map(
      cat([
        char('('), expr, char(')')
      ]),
      ([, n,]) => n
    )
  ])(input);
}