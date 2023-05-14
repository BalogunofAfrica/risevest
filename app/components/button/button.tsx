import { useCallback, useMemo } from "react";
import { match } from "ts-pattern";

import { ActivityIndicator, Box, Text, TextProps } from "@/components/base";
import { Icon, IconName } from "@/components/icon";
import { px } from "@/constants";
import { useTheme } from "@/theme";

import { PressableSpring, PressableSpringProps } from "./pressable-spring";

export type ButtonProps = PressableSpringProps & {
  icon?: IconName;
  isLoading?: boolean;
  label: string;
  labelProps?: TextProps;
  variant?: "primary" | "secondary" | "outline";
};

/**
 * Custom `Button` component with two variants (primary, secondary & outline)
 * inherits Pressable Props
 * @see {@link PressableSpringProps}
 */
export function Button({
  icon,
  isLoading = false,
  label,
  labelProps,
  variant = "primary",
  onPress,
  ...rest
}: ButtonProps) {
  const { spacing } = useTheme();
  const handlePress: NonNullable<PressableSpringProps["onPress"]> = useCallback(
    (event) => {
      if (isLoading) return;
      if (onPress) {
        onPress(event);
      }
    },
    [isLoading, onPress],
  );
  const iconStyle = useMemo(() => ({ marginRight: spacing.s }), [spacing]);

  const bg = match(variant)
    .with("outline", () => "transparent" as const)
    .with("primary", () => "teal" as const)
    .with("secondary", () => "offWhite" as const)
    .exhaustive();
  const borderColor = match(variant)
    .with("outline", () => "lightStroke" as const)
    .otherwise(() => "transparent" as const);
  const borderWidth = match(variant)
    .with("outline", () => px(1))
    .otherwise(() => 0);
  const textColor = match(variant)
    .with("primary", () => "white" as const)
    .otherwise(() => "teal" as const);

  return (
    <PressableSpring
      alignItems="center"
      borderRadius="xs"
      justifyContent="center"
      onPress={handlePress}
      paddingVertical="m"
      {...{ bg, borderColor, borderWidth }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          key={label}
        >
          {icon && <Icon name={icon} size="m" style={iconStyle} />}
          <Text
            color={textColor}
            fontFamily="DMSans_700Bold"
            lineHeight={undefined}
            textAlign="justify"
            {...labelProps}
          >
            {label}
          </Text>
        </Box>
      )}
    </PressableSpring>
  );
}
