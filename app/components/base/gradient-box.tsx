import { createBox } from "@shopify/restyle";
import { LinearGradient } from "expo-linear-gradient";
import { forwardRef } from "react";

import { Theme } from "@/theme";

const ExpoGradient = createBox<
  Theme,
  React.ComponentProps<typeof LinearGradient>
>(LinearGradient);

export type GradientProps = React.ComponentProps<typeof ExpoGradient>;

export type GradientRef = LinearGradient;

export const GradientBox = forwardRef<GradientRef, GradientProps>(
  (props, ref) => <ExpoGradient ref={ref} {...props} />,
);
