import {PrinterOutput} from "../../types";
import {kotlinDeclarationPrinter} from "./declaration";
import {KotlinObjectDeclaration} from "../../../syntax/kotlin";

describe('declaration', () => {
  const printer = kotlinDeclarationPrinter;

  test('object', () => {
    const input = {
      indentLevel: 0,
      data: <KotlinObjectDeclaration>{
        type: 'object',
        modifiers: {modifiers: []},
        name: 'Name',
        body: [],
      }
    };
    const output = printer(input);
    expect(output).toEqual<PrinterOutput>([
      'object Name {',
      '}',
    ]);
  });
});