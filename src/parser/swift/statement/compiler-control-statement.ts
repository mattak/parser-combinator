import {Parser} from "../../../types";
import {or} from "../../../combinators";

export const compilerControlStatement: Parser<string> = or([
  // TODO: implement
  // conditionalCompilationBlock, // #if ~ #endif
  // lineControlStatement, // #sourceLocation()
  // diagnosticStatement, // #error(), #warning()
]);