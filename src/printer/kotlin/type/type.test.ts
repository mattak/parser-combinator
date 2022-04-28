import {defaultKotlinPrinterTable, KotlinPrinterTable, PrinterOutput} from "../kotlin-printer";
import {
  kotlinNullableTypePrinter,
  kotlinParenthesizedTypePrinter,
  kotlinTypePrinter,
  kotlinTypeReferencePrinter
} from "./type";
import {
  KotlinDynamicType,
  KotlinNullableType,
  KotlinParenthesizedType,
  KotlinType,
  KotlinTypeReference,
  KotlinUserType
} from "../../../syntax/kotlin";

describe('kotlinTypePrinter', () => {
  const printer = kotlinTypePrinter;
  const mockTypeRef = jest.fn().mockImplementation(() => ['SampleTypeRef'])
  const mockNullableType = jest.fn().mockImplementation(() => ['Sample?'])
  const mockParenthesizedType = jest.fn().mockImplementation(() => ['(Sample)'])
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'type-reference': mockTypeRef,
    'nullable-type': mockNullableType,
    'parenthesized-type': mockParenthesizedType,
  };

  test('typeReference', () => {
    const input = <KotlinType>{
      value: <KotlinTypeReference>{
        type: "typeReference",
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['SampleTypeRef']);
  });

  test('nullable', () => {
    const input = <KotlinType>{
      value: <KotlinNullableType>{
        type: "nullable",
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['Sample?']);
  });

  test('parenthesized', () => {
    const input = <KotlinType>{
      value: <KotlinParenthesizedType>{
        type: "parenthesized",
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['(Sample)']);
  });
});

describe('kotlinNullableTypePrinter', () => {
  const printer = kotlinNullableTypePrinter;
  const mockTypeRef = jest.fn().mockImplementation(() => ['SampleTypeRef'])
  const mockParenthesizedType = jest.fn().mockImplementation(() => ['(Sample)'])
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'type-reference': mockTypeRef,
    'parenthesized-type': mockParenthesizedType,
  };

  test('typeReference', () => {
    const input = <KotlinNullableType>{
      type: 'nullable',
      value: <KotlinTypeReference>{
        type: "typeReference",
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['SampleTypeRef?']);
  });

  test('parenthesized', () => {
    const input = <KotlinNullableType>{
      type: 'nullable',
      value: <KotlinParenthesizedType>{
        type: "parenthesized",
      },
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['(Sample)?']);
  });
})

describe('kotlinParenthesizedTypePrinter', () => {
  const printer = kotlinParenthesizedTypePrinter;
  const mockType = jest.fn().mockImplementation(() => ['SampleType'])
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'type': mockType,
  };

  test('typeReference', () => {
    const input = <KotlinParenthesizedType>{
      type: 'parenthesized',
      value: <KotlinType>{},
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['(SampleType)']);
  });
})

describe('kotlinTypeReferencePrinter', () => {
  const printer = kotlinTypeReferencePrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
  };

  test('dynamic', () => {
    const input = <KotlinTypeReference>{
      type: 'typeReference',
      value: <KotlinDynamicType>{
        type: 'dynamicType'
      }
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['dynamic']);
  });

  test('userType', () => {
    const input = <KotlinTypeReference>{
      type: 'typeReference',
      value: <KotlinUserType>{
        type: 'userType',
        name: 'UserType',
      }
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<PrinterOutput>(['UserType']);
  });
})
