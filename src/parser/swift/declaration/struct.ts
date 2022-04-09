import {Parser} from "../../../types";
import {cat, or, rep} from "../../../combinators";
import {map, opt, str} from "../../../util";
import {identifier} from "../lexical-struct/identifier";
import {char} from "../../../char";
import {accessLevelModifier, SwiftAccessLevelModifier} from "./declaration-modifier";
import {declaration, SwiftDeclaration} from "./declaration";
import {whitespace, whitespace0} from "../lexical-struct/whitespace";

export interface SwiftStructMember {
  structMemberType: 'declaration' | 'compiler-control-statement';
}

export interface SwiftStructMemberDeclaration extends SwiftStructMember, SwiftDeclaration {
  structMemberType: 'declaration';
}

export interface SwiftStruct {
  name: string;
  accessLevelModifier: SwiftAccessLevelModifier | null,
  body: SwiftStructMember[];
}

// <struct-member> ::= <declaration> | <compiler-control-statement>
// <struct-body> ::= '{' <struct-member>* '}'
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
export const struct: Parser<SwiftStruct> = map(
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
    return <SwiftStruct>{
      name: name,
      accessLevelModifier: modifier.status == 'some' ? modifier.value : null,
      body: body,
    }
  }
);