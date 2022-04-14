import {declarationConverter} from "./declaration";
import {SwiftDeclaration} from "../../../syntax/swift";

describe('declaration', () => {
  const converter = declarationConverter;

  test('empty', () => {
    const input = <SwiftDeclaration>{};
    expect(() => {
      converter(input);
    }).toThrow()
  })

  test('struct', () => {
    const input = <SwiftDeclaration>{
      type: 'struct',
      name: 'sample',
      accessLevelModifier: null,
      body: [],
    };
    expect(() => {
      converter(input);
    }).not.toThrow()
  })
});
