import {Printer} from "../../types";
import {KotlinFile} from "../../../syntax/kotlin";
import {kotlinDeclarationPrinter} from "./declaration";

export const kotlinFilePrinter: Printer<KotlinFile> = input => {
  const body = input.data.topLevelObjects.map(x => {
    return kotlinDeclarationPrinter({
      indentLevel: input.indentLevel,
      data: x,
    })
  });

  return [
    `package ${input.data.packageHeader}`,
    '',
    ...input.data.importList.importHeaders.map(x => x.path),
    '',
    ...body.flat()
  ];
}
