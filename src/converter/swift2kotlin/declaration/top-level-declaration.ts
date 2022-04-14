import {KotlinFile} from "../../../syntax/kotlin";
import {SwiftTopLevelDeclaration} from "../../../syntax/swift";
import {statementConverter} from "../statement/statement";

export function topLevelDeclarationConverter(input: SwiftTopLevelDeclaration, supplement: KotlinFile | null): KotlinFile {
  return <KotlinFile>{
    packageHeader: supplement?.packageHeader ?? '',
    importList: [
      ...(supplement?.importList ?? [])
    ],
    topLevelObjects: input.statements.map(statementConverter),
  }
}
