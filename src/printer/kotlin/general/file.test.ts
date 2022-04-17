import {kotlinFilePrinter} from "./file";
import {KotlinFile} from "../../../syntax/kotlin";

describe('kotlinPrint', () => {
  const printer = kotlinFilePrinter;

  test('package', () => {
    const input = <KotlinFile>{
      packageHeader: 'com.example',
      importList: {importHeaders: []},
      topLevelObjects: [],
    };
    const output = printer(input, 0);
    expect(output).toEqual<string[]>([
      'package com.example',
      '',
      '',
    ]);
  });
});