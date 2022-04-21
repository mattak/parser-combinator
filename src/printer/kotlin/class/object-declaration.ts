import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinClassMemberDeclarationDeclaration,
  KotlinObjectDeclaration
} from "../../../syntax/kotlin";
import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";

export function kotlinObjectDeclarationPrinter(table: KotlinPrinterTable, input: KotlinObjectDeclaration, depth: number): PrinterOutput {
  const body = table['class-body'](table, input.body, depth);

  return [
    `object ${input.name} {`,
    ...body,
    `}`,
  ];
}

export function kotlinClassBodyPrinter(table: KotlinPrinterTable, input: KotlinClassBody, depth: number): PrinterOutput {
  const results = input.members
    .map(x => table['class-member-declaration'](table, x, depth + 1))
    .flat()

  return [
    ...results
  ];
}

export function kotlinClassMemberDeclarationPrinter(table: KotlinPrinterTable, input: KotlinClassMemberDeclaration, depth: number): PrinterOutput {
  switch (input.type) {
    case "declaration":
      const value = input.value;
      return table['declaration'](table, value, depth);
    default:
      throw Error(`not implemented type ${input.type}`);
  }
}