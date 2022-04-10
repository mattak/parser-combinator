import {SwiftDeclaration} from "../../../parser/swift/declaration/declaration";

export interface SwiftImportDeclaration extends SwiftDeclaration {
  type: 'import',
  attributes: null,
  kind: null,
  path: string,
}