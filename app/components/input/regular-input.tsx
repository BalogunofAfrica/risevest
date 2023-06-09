import { forwardRef, useCallback, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";

import {
  ActivityIndicator,
  Box,
  BoxProps,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
} from "@/components/base";
import { Pressable } from "@/components/button";
import { Icon, IconName } from "@/components/icon";
import { px } from "@/constants";
import { useTheme } from "@/theme";
import { FontNames } from "@/theme/config/fonts";

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedText = Animated.createAnimatedComponent(Text);

export type RegularInputRefType = RNTextInput;
export interface RegularInputProps
  extends Omit<TextInputProps, "onBlur" | "onFocus"> {
  containerProps?: BoxProps;
  disabled?: boolean;
  footer?: string;
  footerProps?: TextProps;
  header?: string;
  headerProps?: TextProps;
  inputContainerProps?: BoxProps;
  leftComponent?: React.ReactNode;
  leftIcon?: IconName;
  renderLoadingIcon?: boolean;
  rightComponent?: React.ReactNode;
  rightIcon?: IconName;
  onLeftIconPress?(): void;
  onRightIconPress?(): void;
  variant?: "dark" | "light";
  whenBlurred?: () => void;
  whenFocused?: () => void;
}

const blurTransition = 0;
const focusTransition = 1;
const config: WithTimingConfig = { easing: Easing.ease };

/**
 * Custom  animated`TextInput` component.
 */
export const RegularInput = forwardRef<RNTextInput, RegularInputProps>(
  (
    {
      containerProps,
      footer,
      footerProps,
      header,
      headerProps,
      inputContainerProps,
      leftComponent,
      leftIcon,
      renderLoadingIcon,
      rightComponent,
      rightIcon,
      secureTextEntry,
      onLeftIconPress,
      onRightIconPress,
      variant = "light",
      whenBlurred,
      whenFocused,
      ...inputProps
    },
    ref,
  ) => {
    const isLight = variant === "light";
    const [secureText, setSecureText] = useState(secureTextEntry ?? false);
    const transition = useSharedValue(blurTransition);
    const { colors, textVariants } = useTheme();
    const animatedStyle = useAnimatedStyle(() => {
      const borderColor = interpolateColor(
        transition.value,
        [blurTransition, focusTransition],
        [colors.lightStroke, colors.teal],
      );
      return {
        borderColor,
      };
    });

    const onBlur = useCallback(() => {
      if (whenBlurred) {
        whenBlurred();
      }
      transition.value = withTiming(blurTransition, config);
    }, [transition, whenBlurred]);
    const onFocus = useCallback(() => {
      if (whenFocused) {
        whenFocused();
      }
      transition.value = withTiming(focusTransition, config);
    }, [transition, whenFocused]);
    const toggleSecureText = useCallback(
      () => setSecureText((_text) => !_text),
      [],
    );

    return (
      <Box {...containerProps}>
        {header ? (
          <Text
            color="textColor"
            fontFamily="DMSans_700Bold"
            marginBottom="sl"
            textAlign="left"
            variant="h6"
            {...headerProps}
          >
            {header}
          </Text>
        ) : null}
        <AnimatedBox
          borderRadius="xs"
          borderWidth={px(1)}
          flexDirection="row"
          overflow="hidden"
          style={animatedStyle}
          {...inputContainerProps}
        >
          {leftComponent || (
            <Box justifyContent="center" visible={!!leftIcon}>
              <Pressable onPress={onLeftIconPress}>
                <Icon name={leftIcon ?? "back-arrow"} size="m" />
              </Pressable>
            </Box>
          )}
          <TextInput
            autoCapitalize="none"
            flex={1}
            onBlur={onBlur}
            onFocus={onFocus}
            paddingHorizontal="m"
            paddingVertical="m"
            ref={ref}
            secureTextEntry={secureText}
            selectionColor={colors.teal}
            style={[
              {
                ...textVariants.defaults,
                color: isLight ? colors.textColor : colors.mainBg,
                fontFamily: FontNames.DMSans_700Bold,
                textAlign: "left",
              },
            ]}
            {...inputProps}
          />
          {renderLoadingIcon ? (
            <Box alignItems="center" justifyContent="center">
              <ActivityIndicator type="dark" />
            </Box>
          ) : null}
          {rightComponent || (
            <Box
              alignItems="center"
              justifyContent="center"
              mr="s"
              position="absolute"
              right={0}
              visible={Boolean(rightIcon || secureTextEntry)}
            >
              <Pressable
                onPress={secureTextEntry ? toggleSecureText : onRightIconPress}
              >
                <Icon
                  name={rightIcon || (secureText ? "eye" : "eye-off")}
                  size="m"
                />
              </Pressable>
            </Box>
          )}
        </AnimatedBox>
        {footer ? (
          <AnimatedText
            color="error"
            entering={FadeIn}
            exiting={FadeOut}
            fontSize={10}
            mt="s"
            textAlign="left"
            {...footerProps}
          >
            {footer}
          </AnimatedText>
        ) : null}
      </Box>
    );
  },
);

// ponent);
