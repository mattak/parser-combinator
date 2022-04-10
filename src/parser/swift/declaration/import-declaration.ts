// <import-declaration> ::= <attributes> ? 'import' <import-kind> ? <import-path>
// <import-kind> ::= typealias | struct | class | enum | protocol | let | var | func
// <import-path> ::= <import-path-identifier> | <import-path-identifier> . <import-path>
// <import-path-identifier> ::= <identifier> | <operator>
import {ParserInput, ParserOutput} from "../../../types";
import {SwiftImportDeclaration} from "../../../syntax/swift/declaration/import-declaration";
import {cat} from "../../../combinators";
import {list, map, str} from "../../../util";
import {whitespace} from "../lexical-struct/whitespace";
import {identifier} from "../lexical-struct/identifier";
import {char} from "../../../char";

function importPath(input: ParserInput): ParserOutput<string> {
  return map(
    list(identifier, char('.')),
    (lst) => {
      return lst.join('.');
    }
  )(input);
}

export function importDeclaration(input: ParserInput): ParserOutput<SwiftImportDeclaration> {
  return map(
    cat([
      // opt(attributes),
      str('import'),
      whitespace,
      // opt(importKind),
      importPath,
    ]),
    ([_import, , path]) => {
      return <SwiftImportDeclaration>{
        type: 'import',
        attributes: null,
        kind: null,
        path: path,
      }
    })(input);
}
