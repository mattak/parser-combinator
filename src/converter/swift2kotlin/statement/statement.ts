import {SwiftStatement} from "../../../syntax/swift";
import {KotlinDeclaration, KotlinStatement, KotlinStatementDeclaration} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";

export function convert_statement_declarations(table: SwiftKotlinConvertTable, input: SwiftStatement): KotlinDeclaration[] {
  switch (input.type) {
    case "declaration":
      return table['declaration'](table, input.value);
    default:
      throw new Error(`cannot convert to declaration: ${input}`)
  }
}

export function convert_statement_statements(table: SwiftKotlinConvertTable, input: SwiftStatement): KotlinStatement[] {
  switch (input.type) {
    case "declaration":
      return table['declaration'](table, input.value).map(decl => {
        return <KotlinStatement>{
          value: <KotlinStatementDeclaration>{
            type: 'declaration',
            value: decl,
          },
        }
      });
    // case 'loop-statement':
    //   break;
    // case 'branch-statement':
    //   break;
    // case 'labeled-statement':
    //   break;
    case 'control-transfer-statement':
      const statement = table['control-transfer-statement__statement'](table, input.value)
      return [statement];
    // case 'defer-statement':
    //   break;
    // case 'do-statement':
    //   break;
    // case 'compiler-control-statement':
    //   break;
    default:
      throw Error(`not handled input: ${input}`);
  }
}
