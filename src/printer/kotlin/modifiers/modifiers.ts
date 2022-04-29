import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {KotlinModifier, KotlinModifiers} from "../../../syntax/kotlin";

export function kotlinModifiersPrinter(
  table: KotlinPrinterTable,
  input: KotlinModifiers,
  depth: number,
): PrinterOutput {
  const modifiers = input.map(x => kotlinModifierPrinter(table, x, depth));
  if (modifiers.length <= 0) return [];
  return [
    modifiers.join(' ')
  ];
}

export function kotlinModifierPrinter(
  table: KotlinPrinterTable,
  input: KotlinModifier,
  depth: number,
): PrinterOutput {
  switch (input) {
    // class
    case "enum":
    case "sealed":
    case "annotation":
    case "data":
    case "inner":
    case "value":
    // member
    case "override":
    case "lateinit":
    // function
    case "tailrec":
    case "operator":
    case "infix":
    case "inline":
    case "external":
    case "suspend":
    // visibility
    case "public":
    case "private":
    case "internal":
    case "protected":
    // property
    case "const":
    // inheritance
    case "abstract":
    case "final":
    case "open":
    // parameter
    case "vararg":
    case "noinline":
    case "crossinline":
    case "expect":
    case "actual":
      return [input];
  }
}
