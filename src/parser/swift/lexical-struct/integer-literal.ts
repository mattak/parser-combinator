import {Parser} from "../../../types";
import {cat, or, rep} from "../../../combinators";
import {map, str} from "../../../util";
import {char, Digit, digit, is} from "../../../char";

type BinaryDigit = '0' | '1';
type BinaryLiteralCharacter = BinaryDigit | '_';

// <binary-digit> ::= 0 | 1
// <binary-literal-character> ::= <binary-digit> | _
// <binary-literal> ::= '0b' <binary-digit> <octal-literal-character>*
const binaryDigit: Parser<BinaryDigit> = or([char('0'), char('1')]);
const binaryLiteralCharacter: Parser<BinaryLiteralCharacter> = or([
  binaryDigit,
  char('_')
]);
export const binaryLiteral: Parser<number> = map(
  cat([
    str('0b'),
    binaryDigit,
    rep(binaryLiteralCharacter),
  ]),
  ([prefix, first, last]) => {
    const dlast = last.join('').replace(/_/g, '');
    const digits = first + dlast;
    return Number.parseInt(digits, 2);
  }
);

type OctalDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
type OctalLiteralCharacter = OctalDigit | '_';

// <octal-digit> ::= 0 | 1 | ... | 7
// <octal-literal-character> ::= <octal-literal> | _
// <octal-literal> ::= '0o' <octal-digit> <octal-literal-character>*
const octalDigit: Parser<OctalDigit> = is((c): c is OctalDigit => /[0-7]/.test(c));
const octalLiteralCharacter: Parser<OctalLiteralCharacter> = is((c): c is OctalLiteralCharacter => /[0-7_]/.test(c));
export const octalLiteral: Parser<number> = map(
  cat([
    str('0o'),
    octalDigit,
    rep(octalLiteralCharacter),
  ]),
  ([prefix, first, last]) => {
    const dlast = last.join('').replace(/_/g, '');
    const digits = first + dlast;
    return Number.parseInt(digits, 8);
  }
);

// <decimal-digit> ::= 0 | ... | 9
// <decimal-literal-character> ::= <decimal-digit> | _
// <decimal-literal> ::= <decimal-digit> <decimal-literal-character>*
type DecimalDigit = Digit;
type DecimalLiteralCharacter = Digit | '_';
const decimalDigit: Parser<DecimalDigit> = digit;
export const decimalDigits: Parser<DecimalDigit[]> = rep(decimalDigit, 1);
const decimalLiteralCharacter = is((c): c is DecimalLiteralCharacter => /[0-9_]/.test(c));
export const decimalLiteral: Parser<number> = map(
  cat([
    decimalDigit,
    rep(decimalLiteralCharacter),
  ]),
  ([first, last]) => {
    const dlast = last.join('').replace(/_/g, '');
    const digits = first + dlast;
    return Number.parseInt(digits, 10);
  }
);

// <hexadecimal-digit> ::= 0 | ... | 9
// <hexadecimal-literal-character> ::= <hexadecimal-digit> | _
// <hexadecimal-literal> ::= <hexadecimal-digit> <hexadecimal-literal-character>*
type HexadecimalDigit = Digit | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
type HexadecimalLiteralCharacter = HexadecimalDigit | '_';
const hexadecimalDigit: Parser<HexadecimalDigit> = is((c): c is HexadecimalDigit => /[0-9a-fA-F]/.test(c));
const hexadecimalLiteralCharacter: Parser<HexadecimalLiteralCharacter> = is((c): c is HexadecimalLiteralCharacter => /[0-9a-fA-F_]/.test(c));
export const hexadecimalLiteral: Parser<number> = map(
  cat([
    str('0x'),
    hexadecimalDigit,
    rep(hexadecimalLiteralCharacter)
  ]),
  ([prefix, first, last]) => {
    const dlast = last.join('').replace(/_/g, '');
    const digits = first + dlast;
    return Number.parseInt(digits, 16);
  }
);

// <integer-literal> ::= <binary-literal> | <octal-literal> | <hexadecimal-literal> | <decimal-literal>
export const integerLiteral: Parser<number> = or([
  binaryLiteral,
  octalLiteral,
  hexadecimalLiteral,
  decimalLiteral,
]);