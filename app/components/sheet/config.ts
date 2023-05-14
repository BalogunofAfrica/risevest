/* eslint-disable no-restricted-syntax */
import { registerSheet } from "react-native-actions-sheet";

import { CountryPickerSheet, RateSheet } from "./sheets";

const sheets = {
  "country-picker": CountryPickerSheet,
  rate: RateSheet,
} as const;

export type Sheets = typeof sheets;
export type SheetNames = keyof Sheets;

for (const sheet of Object.keys(sheets) as SheetNames[]) {
  registerSheet(sheet, sheets[sheet]);
}

export {};
