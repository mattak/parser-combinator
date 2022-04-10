import {SwiftType} from "./type";

export interface SwiftTypeIdentifierType extends SwiftType {
  type: 'type-identifier';
  name: string;
  genericArguments: SwiftType[];
  innerType: SwiftTypeIdentifierType | null;
}

