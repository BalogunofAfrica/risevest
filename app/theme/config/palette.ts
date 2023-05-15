import Color from "color";

import { objectKeys } from "@/utils/functions";

export const palette = {
  black: Color("#222222"),
  darkGrayishBlue: Color("#94A1AD"),
  error: Color("#FF0101"),
  grayishOrange: Color("#FEFAF7"),
  grayishPink: Color("#FDF4F9"),
  indigo: Color("#B80074"),
  instructiveGreen: Color("#27BF41"),
  lightGrayishBlue: Color("#E1E8ED"),
  lightGrayishCyan: Color("#E2F5F6"),
  lightStroke: Color("#71879C33").alpha(0.2),
  offWhite: Color("#71879C1A").alpha(0.1),
  orange: Color("#FE7122"),
  paleCyan: Color("#F6FFFE"),
  softText: Color("#71879C"),
  success: Color("#76EE59"),
  teal: Color("#0898A0"),
  teal2: Color("#41BCC4"),
  transparent: Color("transparent"),
  transparentBlack: Color("#000").alpha(0.4),
  white: Color("#FFFFFF"),
};

export const stringifyPaletteValues = <T extends string>(
  p: Record<T, Color>,
) => {
  const paletteObject = {} as Record<T, string>;

  // eslint-disable-next-line unicorn/no-array-for-each
  objectKeys(p).forEach((key) => {
    if (palette && !!p[key]) {
      paletteObject[key] = p[key].toString();
    }
  });

  return paletteObject;
};
