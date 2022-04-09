import {Parser} from "../../../types";
import {str} from "../../../util";
import {or} from "../../../combinators";

type SwiftLiteralBoolean = 'true' | 'false';
export const booleanLiteral: Parser<SwiftLiteralBoolean> = or([
  str('true'),
  str('false'),
])