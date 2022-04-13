export interface PrinterInput<T> {
  indentLevel: number;
  data: T;
}

export type PrinterOutput = string[];
export type Printer<T> = (input: PrinterInput<T>) => PrinterOutput;
