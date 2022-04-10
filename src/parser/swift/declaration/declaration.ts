import {Parser, ParserInput, ParserOutput} from "../../../types";
import {or} from "../../../combinators";
import {constantDeclaration} from "./constant-declaration";
import {importDeclaration} from "./import-declaration";

type SwiftDeclarationType = 'import'
  | 'constant'
  | 'variable'
  | 'typealias'
  | 'function'
  | 'enum'
  | 'struct'
  | 'class'
  | 'actor'
  | 'protocol'
  | 'initializer'
  | 'deinitializer'
  | 'extension'
  | 'subscript'
  | 'operator'
  | 'precedence-group';

export interface SwiftDeclaration {
  type: SwiftDeclarationType,
}

export function declaration(input: ParserInput): ParserOutput<SwiftDeclaration> {
  return or<SwiftDeclaration>([
    importDeclaration,
    constantDeclaration,
    // variable-declaration
    // typealias-declaration
    // function-declaration
    // enum-declaration
    // struct-declaration
    // class-declaration
    // actor-declaration
    // protocol-declaration
    // initializer-declaration
    // deinitializer-declaration
    // extension-declaration
    // subscript-declaration
    // operator-declaration
    // precedence-group-declaration
  ])(input);
}