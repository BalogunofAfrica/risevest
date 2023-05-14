/* eslint-disable unicorn/prefer-module */
/* eslint-disable global-require */
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import { ObjectValues } from "@/utils/types";

export type TFontValues = ObjectValues<typeof Fonts>;

export const Fonts = {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  TomatoGrotesk_400Regular: require("../../assets/fonts/TomatoGrotesk-Regular.otf"),
  TomatoGrotesk_500Medium: require("../../assets/fonts/TomatoGrotesk-Medium.otf"),
  TomatoGrotesk_700Bold: require("../../assets/fonts/TomatoGrotesk-Bold.otf"),
} as const;

export type TFontNames = keyof typeof Fonts;

// eslint-disable-next-line unicorn/no-array-reduce
export const FontNames = Object.entries(Fonts).reduce((accumulator, [key]) => {
  accumulator[key] = key;
  return accumulator;
}, {} as Record<string, string>) as Record<TFontNames, TFontNames>;
