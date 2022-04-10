import {ParserInput, ParserOutput} from "../../../types";
import {literal} from "../lexical-struct/literal";
import {or} from "../../../combinators";
import {map} from "../../../util";
import {SwiftLiteralExpression} from "../../../syntax/swift";

export function literalExpression(input: ParserInput): ParserOutput<SwiftLiteralExpression> {
  return or([
    // literal
    map(
      literal,
      (s) => <SwiftLiteralExpression>{
        type: 'literal',
        value: s,
      }
    ),
    // array
    // dictionary
    // playground
  ])(input);
}
