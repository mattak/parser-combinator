import {
  KotlinClassBody,
  KotlinClassMemberDeclaration,
  KotlinDeclaration,
  KotlinFile,
  KotlinObjectDeclaration
} from "../../syntax/kotlin";
import {kotlinFilePrinter} from "./general/file";
import {kotlinDeclarationPrinter} from "./general/declaration";
import {
  kotlinClassBodyPrinter,
  kotlinClassMemberDeclarationPrinter,
  kotlinObjectDeclarationPrinter
} from "./class/object-declaration";

export type PrinterOutput = string[];
export type KotlinPrinter<T> = (table: KotlinPrinterTable, input: T, depth: number) => PrinterOutput;

export interface KotlinPrinterTable {
  'file': KotlinPrinter<KotlinFile>,
  'declaration': KotlinPrinter<KotlinDeclaration>,
  'object-declaration': KotlinPrinter<KotlinObjectDeclaration>,
  'class-body': KotlinPrinter<KotlinClassBody>,
  'class-member-declaration': KotlinPrinter<KotlinClassMemberDeclaration>,
}

export const defaultKotlinPrinterTable: KotlinPrinterTable = {
  'file': kotlinFilePrinter,
  'declaration': kotlinDeclarationPrinter,
  'object-declaration': kotlinObjectDeclarationPrinter,
  'class-body': kotlinClassBodyPrinter,
  'class-member-declaration': kotlinClassMemberDeclarationPrinter,
}
