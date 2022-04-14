import {kotlinObjectDeclarationPrinter} from "./object-declaration";
import {KotlinClassBody, KotlinObjectDeclaration} from "../../../syntax/kotlin";
import {PrinterOutput} from "../../../printer/types";

describe('kotlinObjectDeclarationPrinter', () => {
  const printer = kotlinObjectDeclarationPrinter;

  test('Empty', () => {
    const input = {
      indentLevel: 0,
      data: <KotlinObjectDeclaration>{
        type: 'object',
        modifiers: {modifiers: []},
        name: "MyStruct",
        body: <KotlinClassBody>{
          members: [],
        },
      }
    };
    const output = printer(input);
    expect(output).toEqual<PrinterOutput>([
      'object MyStruct {',
      '}',
    ]);
  });
});

