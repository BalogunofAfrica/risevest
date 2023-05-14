export const objectKeys = <T extends object, K extends keyof T>(
  object: T,
): K[] => Object.keys(object) as K[];
