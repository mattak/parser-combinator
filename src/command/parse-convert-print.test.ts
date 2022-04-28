import {parseConvertPrint} from "./parse-convert-print";
import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../converter/swift2kotlin/swift-converter";
import {defaultKotlinPrinterTable, KotlinPrinterTable} from "../printer/kotlin/kotlin-printer";

describe('struct', () => {
  const converterTable: SwiftKotlinConvertTable = {
    ...defaultSwiftKotlinConvertTable,
    'packageHeader': () => 'com.example.test'
  };
  const printerTable: KotlinPrinterTable = {
    ...defaultKotlinPrinterTable,
  };

  test('struct', () => {
    const input = `struct Sample {
}`.split('');
    const output = parseConvertPrint(input, converterTable, printerTable).join('\n');
    const outputExpect = `package com.example.test

object Sample {
}`;
    expect(output).toEqual(outputExpect);
  })

  test('struct and val1', () => {
    const input = `struct Sample {
    let a = 1
}`.split('');
    const output = parseConvertPrint(input, converterTable, printerTable).join('\n');
    const outputExpect = `package com.example.test

object Sample {
    val a = 1
}`;
    expect(output).toEqual(outputExpect);
  })

  test('struct and val:"sample"', () => {
    const input = `struct Sample {
    let a = "sample1"
    let b = "sample2"
}`.split('');
    const output = parseConvertPrint(input, converterTable, printerTable).join('\n');
    const outputExpect = `package com.example.test

object Sample {
    val a = "sample1"
    val b = "sample2"
}`;
    expect(output).toEqual(outputExpect);
  })
})

describe('function', () => {
  const converterTable: SwiftKotlinConvertTable = {
    ...defaultSwiftKotlinConvertTable,
    'packageHeader': () => 'com.example.test'
  };
  const printerTable: KotlinPrinterTable = {
    ...defaultKotlinPrinterTable,
  };

  test('func run(a: Sample) {}', () => {
    const input = `func run(a: Sample) {
}`.split('');
    const output = parseConvertPrint(input, converterTable, printerTable).join('\n');
    const outputExpect = `package com.example.test

fun run(a: Sample) {
}`;
    expect(output).toEqual(outputExpect);
  })
})