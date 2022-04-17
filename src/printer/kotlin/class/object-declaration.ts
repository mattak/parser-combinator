import {PrinterOutput} from "../../types";
import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinClassMemberDeclarationDeclaration,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {kotlinDeclarationPrinter} from "../general/declaration";

export function kotlinObjectDeclarationPrinter(input: KotlinObjectDeclaration, depth: number): PrinterOutput {
  const body = kotlinClassBodyPrinter(input.body, depth);

  return [
    `object ${input.name} {`,
    ...body,
    `}`,
  ];
}

export function kotlinClassBodyPrinter(input: KotlinClassBody, depth: number): PrinterOutput {
  const results = input.members
    .map(x => kotlinClassMemberDeclarationPrinter(x, depth + 1))
    .flat()

  return [
    ...results
  ];
}

export function kotlinClassMemberDeclarationPrinter(input: KotlinClassMemberDeclaration, depth: number): PrinterOutput {
  switch (input.type) {
    case "declaration":
      const value = (<KotlinClassMemberDeclarationDeclaration>(input)).value;
      return kotlinDeclarationPrinter(value, depth);
    default:
      throw Error(`not implemented type ${input.type}`);
  }
}