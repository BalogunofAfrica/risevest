import { createBox } from "@shopify/restyle";
import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { Theme } from "@/theme";

export const ScrollBox = createBox<
  Theme,
  React.ComponentProps<typeof ScrollView>
>(ScrollView);

export type ScrollBoxProps = React.ComponentProps<typeof ScrollBox>;
export type ScrollBoxRef = ScrollView;

export const KeyboardAwareScrollBox = createBox<
  Theme,
  React.ComponentProps<typeof KeyboardAwareScrollView>
>(KeyboardAwareScrollView);
export type KeyboardAwareScrollBoxProps = React.ComponentProps<
  typeof KeyboardAwareScrollBox
>;
export type KeyboardAwareScrollBoxRef = KeyboardAwareScrollView;
