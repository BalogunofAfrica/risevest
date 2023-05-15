import { useNavigation } from "@react-navigation/native";

import { done } from "@/assets/images";
import { Box, ImageBox, Screen, Text } from "@/components/base";
import { Button } from "@/components/button";
import { px } from "@/constants";
import { useAppRoute } from "@/hooks/navigation";
import { useGlobalStore } from "@/services/storage";

export function PlanCreated() {
  const navigation = useNavigation();
  const route = useAppRoute<"/home/plan-created">();
  const store = useGlobalStore();

  const onContinue = () => {
    navigation.navigate("/home/view-plan", route.params);
  };

  return (
    <Screen justifyContent="space-between" px="sl" py="Ml">
      <Box alignItems="center" gap="xl" pt="xxl">
        <ImageBox aspectRatio={1} height={px(90)} source={done} />
        <Box gap="s" px="xxl">
          <Text fontFamily="TomatoGrotesk_500Medium" variant="h5">
            You just created your plan.
          </Text>
          <Text color="softText">Well done, {store.getter("firstName")}</Text>
        </Box>
      </Box>
      <Button label="View plan" onPress={onContinue} />
    </Screen>
  );
}
