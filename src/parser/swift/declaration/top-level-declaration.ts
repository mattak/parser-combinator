import {Parser} from "../../../types";
import {statement} from "../statement/statement";
import {map} from "../../../util";
import {SwiftTopLevelDeclaration} from "../../../syntax/swift";
import {rep} from "../../../combinators";

export const topLevelDeclaration: Parser<SwiftTopLevelDeclaration> = map(
  rep(statement),
  (s) => {
    return {
      statements: s,
    }
  }
);