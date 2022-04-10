import {Parser} from "../../../types";
import {rep} from "../../../combinators";
import {statement} from "../statement/statement";
import {map} from "../../../util";
import {SwiftTopLevelDeclaration} from "../../../syntax/swift";

export const topLevelDeclaration: Parser<SwiftTopLevelDeclaration> = map(
  rep(statement),
  (s) => {
    return {
      statements: s,
    }
  }
);