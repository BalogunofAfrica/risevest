import { Box, Text } from "@/components/base";
import { Button, PressableSpring } from "@/components/button";
import { Icon } from "@/components/icon";
import { useGlobalStore } from "@/services/storage";
import { getTimedGreeting } from "@/utils/functions";

export function HomeHeader() {
  const store = useGlobalStore();

  return (
    <Box alignItems="center" flexDirection="row" justifyContent="space-between">
      <Box>
        <Text textAlign="left">{getTimedGreeting()}</Text>
        <Text fontSize={20} textAlign="left">
          {store.getter("firstName")}
        </Text>
      </Box>
      <Box alignItems="center" flexDirection="row" gap="s">
        <Button
          borderRadius="xl"
          label="Earn 3% bonus "
          labelProps={{ variant: "p" }}
          px="m"
          py="s"
        />
        <PressableSpring>
          <Icon name="bell" size="xxl" />
        </PressableSpring>
      </Box>
    </Box>
  );
}
