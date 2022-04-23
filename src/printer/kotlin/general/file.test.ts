import {kotlinFilePrinter} from "./file";
import {KotlinDeclaration, KotlinFile, KotlinImportHeader} from "../../../syntax/kotlin";
import {defaultKotlinPrinterTable, KotlinPrinterTable} from "../kotlin-printer";

describe('kotlinPrint', () => {
  const printer = kotlinFilePrinter;
  const mockDec = jest.fn().mockImplementation(() => ['val a = 1']);

  test('package', () => {
    const input = <KotlinFile>{
      packageHeader: 'com.example',
      importList: {importHeaders: []},
      topLevelObjects: [],
    };
    const table = <KotlinPrinterTable>{
      ...defaultKotlinPrinterTable,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<string[]>([
      'package com.example',
      '',
    ]);
  });

  test('imports', () => {
    const input = <KotlinFile>{
      packageHeader: '',
      importList: {importHeaders: [<KotlinImportHeader>{path: "com.example.Sample"}]},
      topLevelObjects: [],
    };
    const table = <KotlinPrinterTable>{
      ...defaultKotlinPrinterTable,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<string[]>([
      'import com.example.Sample',
      '',
    ]);
  });

  test('', () => {
    const input = <KotlinFile>{
      packageHeader: '',
      importList: {importHeaders: []},
      topLevelObjects: [<KotlinDeclaration>{}],
    };
    const table = <KotlinPrinterTable>{
      ...defaultKotlinPrinterTable,
      'declaration': mockDec,
    };
    const output = printer(table, input, 0);
    expect(output).toEqual<string[]>([
      'val a = 1',
    ]);
  });
});