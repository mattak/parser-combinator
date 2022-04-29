import {declarationModifier} from "./access-control-levels";
import {ParserOutput} from "../../../types";
import {SwiftDeclarationModifier} from "../../../syntax/swift";

describe('declaration-modifier', () => {
  const parser = declarationModifier;

  test('Input empty', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftDeclarationModifier>>({
      result: 'fail',
    });
  });

  test('Input a', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftDeclarationModifier>>({
      result: 'fail',
    });
  });

  const words = [
    "class",
    "convenience",
    "dynamic",
    "final",
    "infix",
    "lazy",
    "optional",
    "override",
    "postfix",
    "prefix",
    "required",
    "static",
    "unowned",
    "unowned(safe)",
    "unowned(unsafe)",
    "weak",
    "private", "private(set)",
    "fileprivate", "fileprivate(set)",
    "internal", "internal(set)",
    "public", "public(set)",
    "open", "open(set)",
    "mutating", "nonmutating",
    "nonisolated",
  ];
  for (let word of words) {
    test(`Input ${word}`, () => {
      const input = [...`${word}`] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: `${word}`,
        rest: [],
      });
    });
  }

  const word2correct: { [word: string]: string } = {
    "unowned ( safe )": "unowned(safe)",
    "unowned ( unsafe )": "unowned(unsafe)",
    "private ( set )": "private(set)",
    "fileprivate ( set )": "fileprivate(set)",
    "internal ( set )": "internal(set)",
    "public ( set )": "public(set)",
    "open ( set )": "open(set)",
  }
  Object.keys(word2correct).forEach(word => {
    let correct = word2correct[word];
    test(`Input ${word}`, () => {
      const input = [...`${word}`] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<string>>({
        result: 'success',
        data: `${correct}`,
        rest: [],
      });
    });
  });

});
