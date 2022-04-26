import {ParserOutput} from "../../../types";
import {typeIdentifier} from "./type-identifier";
import {SwiftTypeIdentifier} from "../../../syntax/swift";

describe('typeIdentifier', () => {
  const parser = typeIdentifier;

  test('EmptyInput', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeIdentifier>>({
      result: 'fail',
    });
  });

  test('Input a', () => {
    const input = [...'a'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeIdentifier>>({
      result: 'success',
      data: {
        type: 'type-identifier',
        name: 'a',
        genericArguments: [],
        innerType: null,
      },
      rest: [],
    });
  });

  test('Input Cat ', () => {
    const input = [...'Cat '] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeIdentifier>>({
      result: 'success',
      data: {
        type: 'type-identifier',
        name: 'Cat',
        genericArguments: [],
        innerType: null,
      },
      rest: [' '],
    });
  });

  test('Input Cat ', () => {
    const input = [...'Cat '] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeIdentifier>>({
      result: 'success',
      data: {
        type: 'type-identifier',
        name: 'Cat',
        genericArguments: [],
        innerType: null,
      },
      rest: [' '],
    });
  });

  test('Input Dog.BloodType', () => {
    const input = [...'Dog.BloodType'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeIdentifier>>({
      result: 'success',
      data: {
        type: 'type-identifier',
        name: 'Dog',
        genericArguments: [],
        innerType: {
          type: 'type-identifier',
          name: 'BloodType',
          genericArguments: [],
          innerType: null,
        },
      },
      rest: [],
    });
  });

  test('Input Cat<Item>', () => {
    const input = [...'Cat<Item>'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeIdentifier>>({
      result: 'success',
      data: {
        type: 'type-identifier',
        name: 'Cat',
        genericArguments: [
          <SwiftTypeIdentifier>{
            type: 'type-identifier',
            name: 'Item',
            genericArguments: [],
            innerType: null,
          }
        ],
        innerType: null,
      },
      rest: [],
    });
  });

  test('Input Cat<Item1, Item2>', () => {
    const input = [...'Cat<Item1, Item2>'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeIdentifier>>({
      result: 'success',
      data: {
        type: 'type-identifier',
        name: 'Cat',
        genericArguments: [
          <SwiftTypeIdentifier>{
            type: 'type-identifier',
            name: 'Item1',
            genericArguments: [],
            innerType: null,
          },
          <SwiftTypeIdentifier>{
            type: 'type-identifier',
            name: 'Item2',
            genericArguments: [],
            innerType: null,
          },
        ],
        innerType: null,
      },
      rest: [],
    });
  });

  test('Input Dog<DogType>.BloodType<Group,RhD>', () => {
    const input = [...'Dog<DogType>.BloodType<Group,RhD>'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<SwiftTypeIdentifier>>({
      result: 'success',
      data: {
        type: 'type-identifier',
        name: 'Dog',
        genericArguments: [
          <SwiftTypeIdentifier>{
            type: 'type-identifier',
            name: 'DogType',
            genericArguments: [],
            innerType: null,
          }
        ],
        innerType: {
          type: 'type-identifier',
          name: 'BloodType',
          genericArguments: [
            <SwiftTypeIdentifier>{
              type: 'type-identifier',
              name: 'Group',
              genericArguments: [],
              innerType: null,
            },
            <SwiftTypeIdentifier>{
              type: 'type-identifier',
              name: 'RhD',
              genericArguments: [],
              innerType: null,
            },
          ],
          innerType: null,
        },
      },
      rest: [],
    });
  });
});
