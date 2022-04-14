import {topLevelDeclarationConverter} from "./top-level-declaration";
import {
  SwiftStatement,
  SwiftStatementDeclaration,
  SwiftStructDeclaration,
  SwiftTopLevelDeclaration
} from "../../../syntax/swift";
import {KotlinClassBody, KotlinFile, KotlinModifiers, KotlinObjectDeclaration} from "../../../syntax/kotlin";

describe('fileConverter', () => {
  const converter = topLevelDeclarationConverter;
  test('Empty content', () => {
    const input = <SwiftTopLevelDeclaration>{
      statements: <SwiftStatement[]>[],
    };
    const supplement = <KotlinFile>{
      packageHeader: 'com.example',
      importList: [],
      topLevelObjects: [],
    }
    const output = converter(input, supplement);
    expect(output).toEqual<KotlinFile>({
      packageHeader: 'com.example',
      importList: [],
      topLevelObjects: [],
    });
  });

  test('struct', () => {
    const input = <SwiftTopLevelDeclaration>{
      statements: <SwiftStatement[]>[
        <SwiftStatementDeclaration>{
          type: 'declaration',
          value: <SwiftStructDeclaration>{
            type: 'struct',
            name: "MyStruct",
            accessLevelModifier: null,
            body: [],
          }
        }
      ],
    };
    const supplement = <KotlinFile>{
      packageHeader: 'com.example',
      importList: [],
      topLevelObjects: [],
    }
    const output = converter(input, supplement);
    expect(output).toEqual<KotlinFile>({
      packageHeader: 'com.example',
      importList: [],
      topLevelObjects: [
        <KotlinObjectDeclaration>{
          type: 'object',
          modifiers: <KotlinModifiers>{modifiers: []},
          name: 'MyStruct',
          body: <KotlinClassBody>{
            members: [],
          },
        },
      ],
    });
  });
});
