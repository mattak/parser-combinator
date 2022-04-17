import {PrinterOutput} from "../../types";
import {kotlinDeclarationPrinter} from "./declaration";
import {KotlinClassBody, KotlinDeclarationObjectDeclaration, KotlinObjectDeclaration} from "../../../syntax/kotlin";

describe('declaration', () => {
  const printer = kotlinDeclarationPrinter;

  test('object', () => {
    const input = {
      indentLevel: 0,
      data: <KotlinDeclarationObjectDeclaration>{
        type: 'object',
        value: <KotlinObjectDeclaration>{
          modifiers: {modifiers: []},
          name: 'Name',
          body: <KotlinClassBody>{
            members: [],
          },
        }
      }
    };
    const output = printer(input);
    expect(output).toEqual<PrinterOutput>([
      'object Name {',
      '}',
    ]);
  });
});