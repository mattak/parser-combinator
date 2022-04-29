import {Parser, ParserInput, ParserOutput} from "../../../types";
import {cat, or} from "../../../combinators";
import {list0, map, opt, str} from "../../../util";
import {identifier} from "../lexical-struct/identifier";
import {char} from "../../../char";
import {accessLevelModifier} from "./access-control-levels";
import {declaration} from "./declaration";
import {whitespace, whitespace0} from "../lexical-struct/whitespace";
import {SwiftStructDeclaration, SwiftStructMember, SwiftStructMemberDeclaration} from "../../../syntax/swift";

// <structDeclaration-member> ::= <declaration> | <compiler-control-statement>
// <structDeclaration-body> ::= '{' <structDeclaration-member>* '}'
const structName: Parser<string> = identifier;

function structMember(input: ParserInput): ParserOutput<SwiftStructMember> {
  return or([
    map(
      declaration,
      (s) => <SwiftStructMemberDeclaration>{
        type: 'declaration',
        value: s
      }),
    // compilerControlStatement,
  ])(input);
}

export function structBody(input: ParserInput): ParserOutput<SwiftStructMember[]> {
  return map(
    cat([
      char('{'),
      whitespace0,
      list0(structMember, whitespace),
      whitespace0,
      char('}'),
    ]),
    ([, , members, ,]) => {
      return members;
    }
  )(input);
}

export function structDeclaration(input: ParserInput): ParserOutput<SwiftStructDeclaration> {
  return map(
    cat([
      // opt(attributes),
      opt(accessLevelModifier),
      str('struct'),
      whitespace,
      structName,
      whitespace0,
      // opt(genericParameterClause),
      // opt(typeInheritanceClause),
      // opt(genericWhereClause),
      structBody,
    ]),
    ([modifier, _struct, _space1, name, _space2, body]) => {
      return <SwiftStructDeclaration>{
        type: 'struct',
        name: name,
        accessLevelModifier: modifier.status == 'some' ? modifier.value : null,
        body: body,
      }
    }
  )(input);
}