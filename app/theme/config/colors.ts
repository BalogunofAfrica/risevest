import { palette, stringifyPaletteValues } from "./palette";

export const rawColors = {
  ...palette,
  mainBg: palette.white,
  textColor: palette.black,
};
export const colors = stringifyPaletteValues(rawColors);

export const gradientColors = {
  white: [
    rawColors.white.alpha(0.8).string(),
    rawColors.white.alpha(0).string(),
  ],
};

export type TColors = keyof typeof colors;
