import {KotlinModifiers} from "../modifiers/modifiers";
import {KotlinClassMemberDeclaration} from "../class-members/class-members";

export interface KotlinClassDeclaration {
  // modifiers? ('class' | ('fun'? 'interface'))
  // simpleIdentifier typeParameters?
  // primaryConstructor?
  // (':' delegationSpecifiers)?
  // typeConstraints?
  // (classBody | enumClassBody)?
}

export interface KotlinObjectDeclaration {
  modifiers: KotlinModifiers,
  name: string,
  body: KotlinClassBody,
}

export interface KotlinClassBody {
  members: KotlinClassMemberDeclaration[],
}
