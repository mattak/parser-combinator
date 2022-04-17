import {Printer} from "../../types";
import {KotlinFile} from "../../../syntax/kotlin";
import {kotlinDeclarationPrinter} from "./declaration";

export const kotlinFilePrinter: Printer<KotlinFile> = input => {
  const body = input.topLevelObjects.map(x => kotlinDeclarationPrinter(x, 0));

  return [
    `package ${input.packageHeader}`,
    '',
    ...input.importList.importHeaders.map(x => x.path),
    '',
    ...body.flat()
  ];
}
