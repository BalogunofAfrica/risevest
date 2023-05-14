import { createBox } from "@shopify/restyle";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Theme } from "@/theme";

export const SafeAreaBox = createBox<
  Theme,
  React.ComponentProps<typeof SafeAreaView>
>(SafeAreaView);

export const SafeAreaBoxProvider = createBox<
  Theme,
  React.ComponentProps<typeof SafeAreaProvider>
>(SafeAreaProvider);

export type SafeAreaBoxProps = React.ComponentProps<typeof SafeAreaBox>;
