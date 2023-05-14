import { forwardRef, useCallback, useEffect, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  Layout,
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

export type MaterialInputRefType = RNTextInput;
export interface MaterialInputProps
  extends Omit<TextInputProps, "onBlur" | "onFocus"> {
  containerProps?: BoxProps;
  disabled?: boolean;
  footer?: string;
  footerProps?: TextProps;
  inputContainerProps?: BoxProps;
  label?: string;
  labelProps?: TextProps;
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
export const MaterialInput = forwardRef<RNTextInput, MaterialInputProps>(
  (
    {
      containerProps,
      footer,
      footerProps,
      label,
      labelProps,
      leftComponent,
      inputContainerProps,
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

    useEffect(() => {
      if (inputProps.value) {
        transition.value = withTiming(focusTransition, config);
      }
    }, [inputProps.value, transition]);

    const onBlur = useCallback(() => {
      if (whenBlurred) {
        whenBlurred();
      }

      if (!inputProps.value) {
        transition.value = withTiming(blurTransition, config);
      }
    }, [inputProps.value, transition, whenBlurred]);
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

    const [height, setHeight] = useState(0);
    const [inputOffsetX, setInputOffsetX] = useState(0);

    const labelStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        transition.value,
        [0, 1],
        [0, -height / 2],
      );
      const translateX = interpolate(
        transition.value,
        [0, 1],
        [inputOffsetX, 0],
      );

      return {
        transform: [{ translateY }, { translateX }],
      };
    });
    const labelTextStyle = useAnimatedStyle(() => {
      const color = interpolateColor(
        transition.value,
        [0, 1],
        [colors.black, colors.teal],
      );
      const fontSize = interpolate(transition.value, [0, 1], [14, 10]);

      return {
        color,
        fontSize,
      };
    });

    return (
      <AnimatedBox layout={Layout} {...containerProps}>
        <AnimatedBox
          alignItems="center"
          borderRadius="xs"
          borderWidth={px(1)}
          flexDirection="row"
          gap="sm"
          onLayout={(event) => {
            setHeight(event.nativeEvent.layout.height);
          }}
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
          {label ? (
            <AnimatedBox
              alignItems="center"
              bg="mainBg"
              mx="s"
              pointerEvents="none"
              position="absolute"
              px="sm"
              style={labelStyle}
            >
              <AnimatedText
                color="textColor"
                fontFamily="DMSans_700Bold"
                style={labelTextStyle}
                textAlign="left"
                {...labelProps}
              >
                {label}
              </AnimatedText>
            </AnimatedBox>
          ) : null}
          <TextInput
            autoCapitalize="none"
            onBlur={onBlur}
            onFocus={onFocus}
            onLayout={(event) => {
              setInputOffsetX(event.nativeEvent.layout.x);
            }}
            px="sl"
            py="m"
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
            width="95%"
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
      </AnimatedBox>
    );
  },
);
