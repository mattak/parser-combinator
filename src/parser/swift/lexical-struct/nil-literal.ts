import {Parser} from "../../../types";
import {str} from "../../../util";

export const nilLiteral: Parser<'nil'> = str('nil');