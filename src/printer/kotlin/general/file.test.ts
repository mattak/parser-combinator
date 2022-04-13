import {kotlinFilePrinter} from "./file";
import {KotlinFile} from "../../../syntax/kotlin";

describe('kotlinPrint', () => {
  const printer = kotlinFilePrinter;

  test('package', () => {
    const input = {
      indentLevel: 0,
      data: <KotlinFile>{
        packageHeader: 'com.example',
        importList: [],
        topLevelObjects: [],
      }
    }
    const output = printer(input);
    expect(output).toEqual<string[]>([
      'package com.example',
      '',
      '',
    ]);
  });
});