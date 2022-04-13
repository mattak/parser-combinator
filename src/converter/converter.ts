export type Converter<From,To> = (input: From, supplement: To | null) => To;
