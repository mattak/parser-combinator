import {Parser} from "../../../types";
import {cat, or, rep} from "../../../combinators";
import {map, opt, str} from "../../../util";
import {identifier} from "../lexical-struct/identifier";
import {char} from "../../../char";
import {accessLevelModifier} from "./declaration-modifier";
import {declaration} from "./declaration";
import {whitespace, whitespace0} from "../lexical-struct/whitespace";
import {SwiftStructDeclaration, SwiftStructMember, SwiftStructMemberDeclaration} from "../../../syntax/swift";

// <structDeclaration-member> ::= <declaration> | <compiler-control-statement>
// <structDeclaration-body> ::= '{' <structDeclaration-member>* '}'
const structName: Parser<string> = identifier;
const structMember: Parser<SwiftStructMember> = or([
  map(
    declaration,
    (s) => <SwiftStructMemberDeclaration>{
      structMemberType: 'declaration',
      ...s
    }),
  // compilerControlStatement,
]);
export const structBody: Parser<SwiftStructMember[]> = map(
  cat([
    char('{'),
    rep(structMember),
    char('}'),
  ]),
  ([, members,]) => {
    return members;
  }
);
export const structDeclaration: Parser<SwiftStructDeclaration> = map(
  cat([
    // opt(attributes),
    opt(accessLevelModifier),
    str('structDeclaration'),
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
);