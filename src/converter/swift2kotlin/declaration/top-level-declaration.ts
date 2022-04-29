import {KotlinFile} from "../../../syntax/kotlin";
import {SwiftImportDeclaration, SwiftStatementDeclaration, SwiftTopLevelDeclaration} from "../../../syntax/swift";
import {SwiftKotlinConvertTable} from "../swift-converter";

export function convert_topLevelDeclaration_file(table: SwiftKotlinConvertTable, input: SwiftTopLevelDeclaration): KotlinFile {
  const imports: SwiftImportDeclaration[] = input.statements
    .flatMap(x => x.type === 'declaration' ? (<SwiftStatementDeclaration>x).value : [])
    .flatMap(x => x.type == 'import' ? (<SwiftImportDeclaration>x) : []);

  return <KotlinFile>{
    packageHeader: table['packageHeader'](table, null),
    importList: table['importList'](table, imports),
    topLevelObjects: input.statements.flatMap(x => table['statement__declarations'](table, x)),
  }
}

export function convert_null_packageHeader(table: SwiftKotlinConvertTable, _: null): string {
  return 'FIXME'
}
