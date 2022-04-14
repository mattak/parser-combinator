import {PrinterInput, PrinterOutput} from "../../../printer/types";
import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinClassMemberDeclarationDeclaration,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {kotlinDeclarationPrinter} from "../../../printer/kotlin/general/declaration";

export function kotlinObjectDeclarationPrinter(input: PrinterInput<KotlinObjectDeclaration>): PrinterOutput {
  const body = kotlinClassBodyPrinter({indentLevel: input.indentLevel, data: input.data.body});

  return [
    `object ${input.data.name} {`,
    ...body,
    `}`,
  ];
}

export function kotlinClassBodyPrinter(input: PrinterInput<KotlinClassBody>): PrinterOutput {
  const results = input.data.members
    .map(x => kotlinClassMemberDeclarationPrinter({indentLevel: input.indentLevel + 1, data: x}))
    .flat()

  return [
    ...results
  ];
}

export function kotlinClassMemberDeclarationPrinter(input: PrinterInput<KotlinClassMemberDeclaration>): PrinterOutput {
  switch (input.data.type) {
    case "declaration":
      const value = (<KotlinClassMemberDeclarationDeclaration>(input.data)).value;
      return kotlinDeclarationPrinter({indentLevel: input.indentLevel, data: value});
    default:
      throw Error(`not implemented type ${input.data.type}`);
  }
}