import {compilerControlStatement} from "./compiler-control-statement";
import {ParserOutput} from "../../../types";

describe('compilerControlStatement', () => {
  const parser = compilerControlStatement;
  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'fail',
    });
  });
});