import {SwiftStatement, SwiftStatementDeclaration} from "../../../syntax/swift";
import {KotlinDeclaration} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";

export function convert_statement_declaration(table: SwiftKotlinConvertTable, input: SwiftStatement): KotlinDeclaration[] {
  switch (input.type) {
    case "declaration":
      return table['declaration'](table, (<SwiftStatementDeclaration>input).value);
    // return declarationConverter((<SwiftStatementDeclaration>input).value);
    // case 'loop-statement':
    //   break;
    // case 'branch-statement':
    //   break;
    // case 'labeled-statement':
    //   break;
    // case 'control-transfer-statement':
    //   break;
    // case 'defer-statement':
    //   break;
    // case 'do-statement':
    //   break;
    // case 'compiler-control-statement':
    //   break;
    default:
      throw Error(`not handled input.type: ${input.type}`);
  }
}
