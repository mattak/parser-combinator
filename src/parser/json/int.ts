import {Parser} from "../../types";
import {diff, map, opt} from "../../util";
import {char, Digit, digit, is} from "../../char";
import {cat, or, rep} from "../../combinators";

export type NonZeroDigit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
const nonZeroDigit: Parser<Digit> = diff(digit, char('0'));
const zeroNumber: Parser<0> = map(char('0'), () => 0);
const nonZeroNumber: Parser<number> = map(
  cat([nonZeroDigit, rep(digit)]),
  ([first, rest]) => Number.parseInt([first, ...rest].join(''), 10)
);
export const numbers: Parser<number> = or([zeroNumber, nonZeroNumber]);

const sign: Parser<1 | -1> = map(
  opt(or([char('+'), char('-')])),
  s => s.status === 'some' ? s.value === '+' ? +1 : -1 : 1
);
export const int: Parser<number> = map(cat([sign, numbers]), ([s, n]) => s * n);
