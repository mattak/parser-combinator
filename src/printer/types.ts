export type PrinterOutput = string[];
export type Printer<T> = (input: T, depth: number) => PrinterOutput;
