import {Parser} from "../../../types";
import {str} from "../../../util";
import {or} from "../../../combinators";
import {SwiftLiteralBoolean} from "../../../syntax/swift";

export const booleanLiteral: Parser<SwiftLiteralBoolean> = or([
  str('true'),
  str('false'),
])