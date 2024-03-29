import {convert_declaration_declarations, convert_declaration_importHeader} from "./declaration";
import {
  SwiftConstantDeclaration,
  SwiftFunctionDeclaration,
  SwiftFunctionHead,
  SwiftFunctionSignature,
  SwiftImportDeclaration,
  SwiftPatternInitializer,
  SwiftStructDeclaration
} from "../../../syntax/swift";
import {defaultSwiftKotlinConvertTable, SwiftKotlinConvertTable} from "../swift-converter";
import {
  KotlinDeclarationFunctionDeclaration,
  KotlinDeclarationPropertyDeclaration,
  KotlinFunctionDeclaration,
  KotlinImportHeader,
  KotlinObjectDeclaration,
  KotlinPropertyDeclaration
} from "../../../syntax/kotlin";

describe('convert_declaration_declaration', () => {
  const mockStruct = jest.fn().mockImplementation(x => <KotlinObjectDeclaration>{});
  const mockConst = jest.fn().mockImplementation(x => [<KotlinPropertyDeclaration>{}]);
  const mockFunction = jest.fn().mockImplementation(x => <KotlinFunctionDeclaration>{});
  const converter = convert_declaration_declarations;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'struct-declaration': mockStruct,
    'constant-declaration': mockConst,
    'function-declaration': mockFunction,
  }

  test('struct', () => {
    const input = <SwiftStructDeclaration>{
      type: 'struct',
      name: 'Name',
      accessLevelModifier: null,
      body: [],
    };
    const output = converter(table, input);
    expect(output).toEqual([<KotlinObjectDeclaration>{}]);
    expect(mockStruct).toBeCalledTimes(1);
  })

  test('import', () => {
    const input = <SwiftImportDeclaration>{
      type: 'import',
      attributes: null,
      kind: null,
      path: "",
    };
    const output = converter(table, input);
    expect(output).toEqual([]);
  })

  test('constant', () => {
    const input = <SwiftConstantDeclaration>{
      type: 'constant',
      patternInitializers: [
        <SwiftPatternInitializer>{},
      ],
    };
    const output = converter(table, input);
    expect(output).toEqual([
      <KotlinDeclarationPropertyDeclaration>{
        type: 'property',
        value: <KotlinPropertyDeclaration>{},
      }
    ]);
  })

  test('function', () => {
    const input = <SwiftFunctionDeclaration>{
      type: 'function',
      head: <SwiftFunctionHead>{},
      name: 'run',
      signature: <SwiftFunctionSignature>{},
      genericWhere: null,
      body: null,
    };
    const output = converter(table, input);
    expect(output).toEqual([
      <KotlinDeclarationFunctionDeclaration>{
        type: 'function',
        value: <KotlinFunctionDeclaration>{},
      }
    ]);
  })
});

describe('convert_declaration_importHeader', () => {
  const mockImport = jest.fn().mockImplementation(x => <KotlinImportHeader>{path: "Sample"});
  const converter = convert_declaration_importHeader;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'import-declaration': mockImport,
  }

  test('import', () => {
    const input = <SwiftImportDeclaration>{
      type: 'import',
      attributes: null,
      kind: null,
      path: "Foundation",
    };
    const output = converter(table, input);
    expect(output).toEqual(<KotlinImportHeader>{path: "Sample"});
    expect(mockImport).toBeCalledTimes(1);
  })
});
