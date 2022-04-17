import {convert_declaration_declaration} from "./declaration";
import {SwiftDeclaration, SwiftImportDeclaration, SwiftStructDeclaration} from "../../../syntax/swift";
import {SwiftKotlinConvertTable, defaultSwiftKotlinConvertTable} from "../swift-converter";

describe('declaration', () => {
  const mockImport = jest.fn().mockImplementation(x => null);
  const mockStruct = jest.fn().mockImplementation(x => null);
  const converter = convert_declaration_declaration;
  const table = <SwiftKotlinConvertTable>{
    ...defaultSwiftKotlinConvertTable,
    'import-declaration': mockImport,
    'struct-declaration': mockStruct,
  }

  test('struct', () => {
    const input = <SwiftDeclaration>{
      type: 'struct',
      value: <SwiftStructDeclaration>{}
    };
    const output = converter(table, input);
    expect(output).toEqual(null);
    expect(mockStruct).toBeCalledTimes(1);
  })

  test('import', () => {
    const input = <SwiftDeclaration>{
      type: 'import',
      value: <SwiftImportDeclaration>{}
    };
    const output = converter(table, input);
    expect(output).toEqual(null);
    expect(mockImport).toBeCalledTimes(1);
  })
});
