import { useState } from "react";
import { FlatList } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { match, P } from "ts-pattern";

import { wpx } from "@/constants";
import { useTheme } from "@/theme";

import { Box, BoxProps, Text } from "../base";
import { Pressable } from "../button";
import { Icon } from "../icon";

const AnimatedText = Animated.createAnimatedComponent(Text);

const data = Array.from({ length: 12 }, (_, index) => {
  if (index === 9) {
    return {
      value: ".",
    };
  }
  if (index === 11) {
    return {
      icon: "delete",
      value: "<",
    } as const;
  }
  return { value: index === 10 ? `0` : `${index + 1}` };
});

type Props = BoxProps & {
  errorMessage?: string;
  maxLength?: number;
  onChangeText?: (value: string) => void;
  onInputComplete?: (value: string) => void;
  validation?: (value: string) => boolean;
};

export function Keypad({
  errorMessage,
  maxLength = 4,
  onChangeText,
  onInputComplete,
  validation,
  ...props
}: Props) {
  const theme = useTheme();
  const [value, setValue] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const handleKeyPress = (action: string) => {
    if (action === "<") {
      if (error) setError(false);
      if (value.length === 0) return;
      setValue((value_) => {
        const newValue = value_.slice(0, -1);
        if (onChangeText) {
          onChangeText(newValue.join(""));
        }
        return newValue;
      });
      return;
    }

    setValue((value_) => {
      const newValue = value_.length < maxLength ? [...value_, action] : value_;
      const valueString = newValue.join("");
      if (onChangeText && value_.length < maxLength) onChangeText(valueString);

      if (newValue.length === maxLength) {
        const isError = validation ? !validation?.(valueString) : error;
        if (!isError) onInputComplete?.(valueString);
        if (validation) setError(isError);
      }

      return newValue;
    });
  };
  const isFilled = (index: number) => value.length >= index + 1;

  return (
    <Box justifyContent="space-between" {...props}>
      <Box gap="m">
        <Box flexDirection="row" justifyContent="space-between">
          {Array.from({ length: maxLength }, (_, index) => `${index}`).map(
            (item, index) => (
              <Box
                alignItems="center"
                aspectRatio={1}
                borderColor={match([error, isFilled(index)])
                  .with([true, P.boolean], () => "error" as const)
                  .with([false, true], () => "teal" as const)
                  .with([false, false], () => "lightStroke" as const)
                  .exhaustive()}
                borderRadius="xxs"
                borderWidth={isFilled(index) ? 1.5 : 1}
                justifyContent="center"
                key={item}
                overflow="hidden"
                width={wpx(42)}
              >
                <AnimatedText
                  entering={FadeInUp}
                  exiting={FadeOutDown}
                  fontFamily="TomatoGrotesk_700Bold"
                  key={`${isFilled(index)}`}
                >
                  {isFilled(index) ? "•" : ""}
                </AnimatedText>
              </Box>
            ),
          )}
        </Box>
        <AnimatedText
          color="error"
          entering={SlideInLeft.springify().damping(20)}
          exiting={SlideOutRight.springify().damping(20)}
          key={`${error}`}
          visible={error}
        >
          {errorMessage}
        </AnimatedText>
      </Box>
      <Box>
        <FlatList
          bounces={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{
            marginHorizontal: theme.spacing.l,
            rowGap: theme.spacing.l,
          }}
          data={data}
          keyExtractor={(index) => index.value}
          numColumns={3}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleKeyPress(item.value)}>
              <Box
                alignItems="center"
                aspectRatio={1}
                bg="offWhite"
                borderRadius="round"
                justifyContent="center"
                width={wpx(72)}
              >
                {item.icon ? (
                  <Icon name={item.icon} />
                ) : (
                  <Text
                    color="teal"
                    fontFamily="TomatoGrotesk_500Medium"
                    textAlign="center"
                    variant="h3"
                  >
                    {item.value}
                  </Text>
                )}
              </Box>
            </Pressable>
          )}
        />
      </Box>
    </Box>
  );
}
