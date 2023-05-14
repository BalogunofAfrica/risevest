import { Box, BoxProps, Text, TextProps } from "@/components/base";
import { Pressable } from "@/components/button";
import { Icon, IconName } from "@/components/icon";
import { navigation } from "@/navigation/utils";

export function Header({
  icon = "question",
  onIconPress,
  text,
  textProps,
  ...rest
}: BoxProps & {
  icon?: IconName;
  onIconPress?: () => void;
  text?: string;
  textProps?: TextProps;
}) {
  const onPress = () => {
    if (onIconPress) {
      onIconPress();
      return;
    }

    navigation.goBack();
  };

  return (
    <Box alignItems="center" flexDirection="row" {...rest}>
      <Pressable bg="offWhite" borderRadius="round" onPress={onPress} p="s">
        <Icon name={icon} size="m" />
      </Pressable>
      <Box
        alignItems="center"
        position="absolute"
        visible={!!text}
        width="100%"
        zIndex={-1}
      >
        <Text fontFamily="TomatoGrotesk_700Bold" variant="h4" {...textProps}>
          {text}
        </Text>
      </Box>
    </Box>
  );
}
