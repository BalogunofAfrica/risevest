import { useNavigation } from "@react-navigation/native";

import { Box, Screen, Text } from "@/components/base";
import { Keypad } from "@/components/input";
import { vh } from "@/constants";

export function CreatePin() {
  const navigation = useNavigation();

  return (
    <Screen gap="xl" px="m" py="Ml">
      <Box gap="sm">
        <Text
          fontFamily="TomatoGrotesk_500Medium"
          textAlign="left"
          variant="h5"
        >
          Create a 6-digit PIN
        </Text>
        <Text color="softText" textAlign="left">
          You’ll use this PIN to sign in and confirm transactions
        </Text>
      </Box>
      <Keypad
        height={vh(60)}
        maxLength={6}
        onInputComplete={(pin) =>
          navigation.navigate("/confirm-pin", {
            pin,
          })
        }
      />
    </Screen>
  );
}
