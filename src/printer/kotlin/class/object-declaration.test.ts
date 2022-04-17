import {kotlinObjectDeclarationPrinter} from "./object-declaration";
import {KotlinClassBody, KotlinObjectDeclaration} from "../../../syntax/kotlin";
import {PrinterOutput} from "../../types";

describe('kotlinObjectDeclarationPrinter', () => {
  const printer = kotlinObjectDeclarationPrinter;

  test('Empty', () => {
    const input = <KotlinObjectDeclaration>{
      type: 'object',
      modifiers: {modifiers: []},
      name: "MyStruct",
      body: <KotlinClassBody>{
        members: [],
      },
    };
    const output = printer(input, 0);
    expect(output).toEqual<PrinterOutput>([
      'object MyStruct {',
      '}',
    ]);
  });
});
