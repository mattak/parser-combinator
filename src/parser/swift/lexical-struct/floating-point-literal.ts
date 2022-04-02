import {or} from "../../../combinators";
import {Parser} from "../../../types";

const floatingPointDecimal: Parser<string> = input => {
  const text = input.join('');
  const match = text.match(/^\d[\d_]*(\.\d[\d_]*)?([eE][\-+]?[\d][\d_]*)?/);
  if (!match) {
    return {
      result: 'fail',
    }
  }

  const data = match[0];
  return {
    result: 'success',
    data,
    rest: input.slice(data.length)
  };
}
const floatingPointHexadecimal: Parser<string> = input => {
  const text = input.join('');
  const match = text.match(/^0x[\da-fA-F][\da-fA-F_]*(\.[\da-fA-F][\da-fA-F_]*)?[pP][\-+]?\d[\d_]*/);
  if (!match) {
    return {
      result: 'fail',
    }
  }

  const data = match[0];
  return {
    result: 'success',
    data,
    rest: input.slice(data.length)
  };
};

export const floatingPointLiteral: Parser<string> = or([
  floatingPointHexadecimal,
  floatingPointDecimal,
]);
