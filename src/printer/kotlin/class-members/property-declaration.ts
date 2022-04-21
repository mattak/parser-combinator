import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinPropertyDeclaration, KotlinVariableDeclaration} from "../../../syntax/kotlin";

export function kotlinPropertyDeclarationPrinter(table: KotlinPrinterTable, input: KotlinPropertyDeclaration, depth: number): PrinterOutput {
  const declaration = table['variable-declaration'](table, input.variableDeclaration, depth);
  const expression = input.expression !== null
    ? ['=', ...table['expression'](table, input.expression, depth)]
    : [];

  const line = [
    input.type,
    ...declaration,
    ...expression,
  ].join(' ');
  return [
    line
  ];
}

export function kotlinVariableDeclarationPrinter(table: KotlinPrinterTable, input: KotlinVariableDeclaration, depth: number): PrinterOutput {
  return [
    input.name
  ];
}
