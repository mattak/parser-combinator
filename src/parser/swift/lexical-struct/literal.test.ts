import {ParserOutput} from "../../../types";
import {literal} from "./literal";
import {SwiftLiteral, SwiftLiteralType} from "../../../syntax/swift";

describe('literal', () => {
  const parser = literal;

  test('Empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftLiteral>>({
      result: 'fail',
    })
  })

  const values = [
    {type: "nil", input: 'nil', expect: 'nil', extraExpect: {}},
    {type: "boolean", input: 'true', expect: true, extraExpect: {}},
    {type: "numeric", input: '1', expect: '1', extraExpect: {numericType: 'integer'}},
    {type: "string", input: '"string"', expect: 'string', extraExpect: {}},
  ];
  for (let v of values) {
    test(v.type, () => {
      const input = [...`${v.input}`] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<unknown>>({
        result: 'success',
        data: {
          type: v.type,
          value: v.expect,
          ...v.extraExpect
        },
        rest: [],
      });
    });
  }
});