import {KotlinModifiers} from "../modifiers/modifiers";
import {KotlinClassMemberDeclaration} from "../class-members/class-members";

export interface KotlinClassDeclaration {
//   type: 'class',
}

export interface KotlinObjectDeclaration {
  modifiers: KotlinModifiers,
  name: string,
  body: KotlinClassBody,
}

export interface KotlinClassBody {
  members: KotlinClassMemberDeclaration[],
}
