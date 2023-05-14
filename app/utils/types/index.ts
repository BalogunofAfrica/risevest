export type FunctionParameter<T> = T extends (...args: infer Args) => unknown
  ? Args
  : never;

export type ObjectValues<T extends object> = T[keyof T];
