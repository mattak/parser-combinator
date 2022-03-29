import {Parser} from "../../types";
import {or, rep} from "../../combinators";
import {char} from "../../char";
import {map} from "../../util";

export const whitespace: Parser<null> = map(
  rep(or([...'\t\n\r '].map(char))),
  () => null
)