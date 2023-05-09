import { Screen, Text } from "@/components/base";
import { Button } from "@/components/button";
import { useNavigation } from "@/hooks/navigation";

export function ScreenOne() {
  const { navigate } = useNavigation();

  return (
    <Screen justifyContent="center" paddingHorizontal="m">
      <Text marginBottom="m" textAlign="center">
        Toast
      </Text>
      <Button
        backgroundColor="error"
        label="Go to next"
        onPress={() => {
          navigate("ScreenTwo");
        }}
      />
    </Screen>
  );
}
