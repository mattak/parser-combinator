import {kotlinFilePrinter} from "./file";
import {KotlinFile} from "../../../syntax/kotlin";
import {defaultKotlinPrinterTable, KotlinPrinterTable} from "../kotlin-printer";

describe('kotlinPrint', () => {
  const printer = kotlinFilePrinter;
  const table = <KotlinPrinterTable>{
    ...defaultKotlinPrinterTable,
    'declaration': jest.fn().mockImplementation(() => []),
  };

  test('package', () => {
    const input = <KotlinFile>{
      packageHeader: 'com.example',
      importList: {importHeaders: []},
      topLevelObjects: [],
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<string[]>([
      'package com.example',
      '',
      '',
    ]);
  });
});