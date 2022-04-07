import {Parser} from "../../../types";
import {or} from "../../../combinators";
import {constantDeclaration} from "./constant-declaration";

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

export const declaration: Parser<SwiftDeclaration> = or([
  // import-declaration
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
]);