import {Parser} from "../../../types";
import {map} from "../../../util";
import {cat, or, rep} from "../../../combinators";
import {alpha, Alphabet, char, Digit, digit, is, upperAlpha, UpperAlphabet} from "../../../char";
import {decimalDigits} from "../integer-literal";

// <identifier> ::= <identifier-head> <identifier-characters>?
//   | '`' <identifier-head> <identifier-characters>? '`'
//   | <implicit-parameter-name>
//   | <property-wrapper-projection>
// )
// <identifier-head> ::= <upper-alpha> | <lower-alpha> | '_' | ...
// <identifier-character> ::= <digit> | <identifier-head> | ...
// <implicit-parameter-name> ::= '$' <decimal-digit>+
// <property-wrapper-projection> ::= '$' <identifier-character>+
type IdentifierHead = Alphabet | '_';
type IdentifierCharacter = Digit | IdentifierHead;
// TODO: add additional unicode endpoints
// https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#grammar_identifier
const identifierHead: Parser<IdentifierHead> = is((c): c is IdentifierHead => /[a-zA-Z_]/.test(c));
const identifierCharacter: Parser<string> = or([digit, identifierHead]);
const implicitParameterName: Parser<string> = map(
  cat([
    char('$'),
    decimalDigits
  ]),
  ([prefix, digits]) => {
    return prefix + digits.join('')
  }
);
const propertyWrapperProjection: Parser<string> = map(
  cat([
    char('$'),
    rep(identifierCharacter, 1),
  ]),
  ([prefix, chars]) => {
    return prefix + chars.join('')
  }
);
const identifierUnQuart: Parser<string> = map(
  cat([
    identifierHead,
    rep(identifierCharacter),
  ]),
  ([head, chars]) => {
    return head + chars.join('');
  }
);
const identifierQuart: Parser<string> = map(
  cat([
    char('`'),
    identifierUnQuart,
    char('`'),
  ]),
  ([, content,]) => {
    return content;
  }
);
export const identifier: Parser<string> = or([
  identifierQuart,
  implicitParameterName,
  propertyWrapperProjection,
  identifierUnQuart,
]);
