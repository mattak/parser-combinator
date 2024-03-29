import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {
  KotlinFunctionBody,
  KotlinFunctionDeclaration,
  KotlinFunctionValueParameter,
  KotlinFunctionValueParameters,
  KotlinParameter
} from "../../../syntax/kotlin";

export function kotlinFunctionDeclarationPrinter(
  table: KotlinPrinterTable,
  input: KotlinFunctionDeclaration,
  depth: number,
): PrinterOutput {
  const modifiers = table['modifiers'](table, input.modifiers, depth);
  const head = modifiers.length > 0 ? `${modifiers[0]} fun` : 'fun';
  const name = input.name.value;
  const parameters = table['function-value-parameters'](table, input.parameters, depth);
  const body = input.body !== null ? table['function-body'](table, input.body, depth) : ['{', '}'];
  const returnType = input.returnType !== null ? ': ' + table['type'](table, input.returnType, depth)[0] : '';

  return [
    `${head} ${name}${parameters}${returnType} ${body[0]}`,
    ...body.slice(1),
  ];
}

export function kotlinFunctionValueParametersPrinter(
  table: KotlinPrinterTable,
  input: KotlinFunctionValueParameters,
  depth: number,
): PrinterOutput {
  const parameters = input.map(x => table['function-value-parameter'](table, x, depth)[0]).join(', ')
  return [
    `(${parameters})`
  ]
}

export function kotlinFunctionValueParameterPrinter(
  table: KotlinPrinterTable,
  input: KotlinFunctionValueParameter,
  depth: number,
): PrinterOutput {
  const prefix: string[] = table['parameter'](table, input.parameter, depth)
  if (input.expression === null) return prefix

  const suffix = table['expression'](table, input.expression, depth)
  if (suffix.length === 0) return prefix;

  return [
    `${prefix[0]} = ${suffix[0]}`
  ]
}

export function kotlinParameterPrinter(
  table: KotlinPrinterTable,
  input: KotlinParameter,
  depth: number,
): PrinterOutput {
  const prefix = input.key.value;
  const suffix = table['type'](table, input.type, depth)
  return [`${prefix}: ${suffix}`]
}

export function kotlinFunctionBodyPrinter(
  table: KotlinPrinterTable,
  input: KotlinFunctionBody,
  depth: number,
): PrinterOutput {
  switch (input.type) {
    case "expression":
      return [
        '= ' + table['expression'](table, input.value, depth)[0],
      ]
    case "block":
      return table['block'](table, input.value, depth)
  }
}