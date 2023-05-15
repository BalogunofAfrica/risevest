import * as React from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { match } from "ts-pattern";

import { Box } from "@/components/base";
import { px, screenWidth } from "@/constants";
import { useTheme } from "@/theme";

const AnimatedBox = Animated.createAnimatedComponent(Box);

type DotProps = {
  index: number;
  translateX: Animated.SharedValue<number>;
};

export function Dot({ index, translateX }: DotProps) {
  const theme = useTheme();

  const activeColor = match(index)
    .with(0, () => theme.colors.orange)
    .with(1, () => theme.colors.indigo)
    .otherwise(() => theme.colors.teal);
  const inactiveColor = theme.colors.offWhite;

  const inputRange = [
    (index - 1) * screenWidth,
    index * screenWidth,
    (index + 1) * screenWidth,
  ];
  const colorOutputRange = [inactiveColor, activeColor, inactiveColor];
  const scaleOutputRange = [1, 1.3, 1];

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colorOutputRange,
    );
    const scale = withSpring(
      interpolate(translateX.value, inputRange, scaleOutputRange),
      { damping: 1 },
    );

    return {
      backgroundColor,
      transform: [{ scale }],
    };
  });

  return (
    <AnimatedBox
      aspectRatio={1}
      borderRadius="xs"
      height={px(6)}
      marginBottom="xl"
      marginHorizontal="xs"
      style={[animatedStyle]}
    />
  );
}
