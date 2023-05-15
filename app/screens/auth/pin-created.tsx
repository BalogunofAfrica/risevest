import { CommonActions, useNavigation } from "@react-navigation/native";

import { done } from "@/assets/images";
import { Box, ImageBox, Screen, Text } from "@/components/base";
import { Button } from "@/components/button";
import { px } from "@/constants";

export function PinCreated() {
  const navigation = useNavigation();

  const onContinue = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "/app" }],
      }),
    );
  };

  return (
    <Screen justifyContent="space-between" px="sl" py="Ml">
      <Box alignItems="center" gap="xl" pt="xxl">
        <ImageBox aspectRatio={1} height={px(90)} source={done} />
        <Box gap="s" px="xxl">
          <Text fontFamily="TomatoGrotesk_500Medium" variant="h5">
            You’ve created your PIN
          </Text>
          <Text color="softText">
            Keep your account safe with your secret PIN. Do not share this PIN
            with anyone.
          </Text>
        </Box>
      </Box>
      <Button label="Okay" onPress={onContinue} />
    </Screen>
  );
}
