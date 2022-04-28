import {KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {
  KotlinNullableType,
  KotlinParenthesizedType,
  KotlinType,
  KotlinTypeReference
} from "../../../syntax/kotlin";

export function kotlinTypePrinter(
  table: KotlinPrinterTable,
  input: KotlinType,
  depth: number,
): PrinterOutput {
  // typeModifiers? (parenthesizedType | nullableType | typeReference | functionType)
  switch (input.value.type) {
    case "nullable":
      return table['nullable-type'](table, input.value, depth)
    case "parenthesized":
      return table['parenthesized-type'](table, input.value, depth)
    case "typeReference":
      return table['type-reference'](table, input.value, depth)
  }
}

export function kotlinNullableTypePrinter(
  table: KotlinPrinterTable,
  input: KotlinNullableType,
  depth: number,
): PrinterOutput {
  switch (input.value.type) {
    case "typeReference": {
      const result = table['type-reference'](table, input.value, depth)
      return [
        `${result[0]}?`
      ]
    }
    case "parenthesized": {
      const result = table['parenthesized-type'](table, input.value, depth)
      return [
        `${result[0]}?`
      ]
    }
  }
}

export function kotlinParenthesizedTypePrinter(
  table: KotlinPrinterTable,
  input: KotlinParenthesizedType,
  depth: number,
): PrinterOutput {
  const result = table['type'](table, input.value, depth)
  return [
    `(${result})`
  ]
}

export function kotlinTypeReferencePrinter(
  table: KotlinPrinterTable,
  input: KotlinTypeReference,
  depth: number,
): PrinterOutput {
  switch (input.value.type) {
    case "dynamicType":
      return [
        'dynamic'
      ]
    case "userType":
      return [
        input.value.name
      ]
  }
}