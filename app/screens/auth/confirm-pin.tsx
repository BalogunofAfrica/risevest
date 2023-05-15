import { useNavigation } from "@react-navigation/native";

import { Box, Screen, Text } from "@/components/base";
import { Keypad } from "@/components/input";
import { vh } from "@/constants";
import { useAppRoute } from "@/hooks/navigation";
import { useGlobalStore } from "@/services/storage";

export function ConfirmPin() {
  const navigation = useNavigation();
  const route = useAppRoute<"/confirm-pin">();
  const store = useGlobalStore();

  const onInputComplete = () => {
    store.setter({
      pin: Number(route.params.pin),
    });
    navigation.navigate("/pin-created");
  };

  return (
    <Screen gap="xl" px="m" py="Ml">
      <Box gap="sm">
        <Text
          fontFamily="TomatoGrotesk_500Medium"
          textAlign="left"
          variant="h5"
        >
          Confirm 6-digit PIN
        </Text>
        <Text color="softText" textAlign="left">
          You’ll use this PIN to sign in and confirm transactions
        </Text>
      </Box>
      <Keypad
        errorMessage="Pin doesn't match"
        height={vh(60)}
        maxLength={6}
        onInputComplete={onInputComplete}
        validation={(pin) => pin === route.params.pin}
      />
    </Screen>
  );
}
