import {ParserOutput} from "../../../types";
import {literal, SwiftLiteral, SwiftLiteralType} from "./literal";

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
    {type: <SwiftLiteralType>"nil", input: 'nil', expect: 'nil', extraExpect: {}},
    {type: <SwiftLiteralType>"boolean", input: 'true', expect: 'true', extraExpect: {}},
    {type: <SwiftLiteralType>"numeric", input: '1', expect: '1', extraExpect: {numericType: 'integer'}},
    {type: <SwiftLiteralType>"string", input: '"string"', expect: 'string', extraExpect: {}},
  ];
  for (let v of values) {
    test(v.type, () => {
      const input = [...`${v.input}`] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<SwiftLiteral>>({
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