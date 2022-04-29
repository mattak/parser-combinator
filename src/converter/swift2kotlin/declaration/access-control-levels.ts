import {SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftDeclarationModifier} from "../../../syntax/swift";
import {KotlinModifier} from "../../../syntax/kotlin";

export function convert_declarationModifier_modifier(
  table: SwiftKotlinConvertTable,
  input: SwiftDeclarationModifier,
): KotlinModifier | null {
  switch (input) {
    // primitive
    case 'class':
    case 'convenience':
    case 'dynamic':
      return null
    case 'final':
      return 'final'
    case 'infix':
      return 'infix'
    case 'lazy':
      return 'lateinit'
    case 'optional':
      return null
    case 'override':
      return 'override';
    case 'postfix':
    case 'prefix':
    case 'required':
    case 'static':
    case 'unowned':
    case 'unowned(safe)':
    case 'unowned(unsafe)':
    case 'weak':
      return null
    // access level modifier
    case 'private':
    case 'private(set)':
    case 'fileprivate':
    case 'fileprivate(set)':
      return 'private'
    case 'internal':
    case 'internal(set)':
      return 'internal'
    case 'public':
    case 'public(set)':
      return 'public'
    case 'open':
    case 'open(set)':
      return 'open'
    // mutation
    case "mutating":
    case "nonmutating":
    // actor
    case "nonisolated":
      return null
  }
}
