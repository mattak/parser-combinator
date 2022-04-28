import {ParserInput, ParserOutput} from "../../../types";
import {or} from "../../../combinators";
import {constantDeclaration} from "./constant-declaration";
import {importDeclaration} from "./import-declaration";
import {SwiftDeclaration} from "../../../syntax/swift";
import {structDeclaration} from "./struct-declaration";
import {functionDeclaration} from "./function-declaration";

export function declaration(input: ParserInput): ParserOutput<SwiftDeclaration> {
  return or<SwiftDeclaration>([
    importDeclaration,
    constantDeclaration,
    // variable-declaration
    // typealias-declaration
    functionDeclaration,
    // enum-declaration
    structDeclaration,
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