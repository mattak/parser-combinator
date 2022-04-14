import {SwiftStatement, SwiftStatementDeclaration} from "../../../syntax/swift";
import {KotlinDeclaration} from "../../../syntax/kotlin";
import {declarationConverter} from "../declaration/declaration";

export function statementConverter(input: SwiftStatement): KotlinDeclaration {
  switch (input.type) {
    case "declaration":
      return declarationConverter((<SwiftStatementDeclaration>input).value);
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
