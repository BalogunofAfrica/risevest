import { useNavigation } from "@react-navigation/native";

import { Box, Text } from "@/components/base";
import { Pressable } from "@/components/button";
import { Icon } from "@/components/icon";
import { useGetPlans } from "@/services/api/plans";

export function Plans() {
  const navigation = useNavigation();
  const plans = useGetPlans();
  const hasPlans = (plans.data?.item_count ?? 0) > 0;

  return (
    <Box px="sl">
      <Box gap="sm">
        <Box flexDirection="row" justifyContent="space-between">
          <Text fontFamily="TomatoGrotesk_400Regular" fontSize={18}>
            {hasPlans ? "Your plans" : "Create a plan"}
          </Text>
          <Pressable
            alignItems="center"
            disabled={!hasPlans}
            flexDirection="row"
            gap="s"
          >
            <Text
              color={hasPlans ? "teal" : "softText"}
              fontFamily="DMSans_700Bold"
              fontSize={14}
            >
              View all plans
            </Text>
            <Icon name="chevron-right" size="sm" />
          </Pressable>
        </Box>
        <Text color="softText" mb="sl" textAlign="left" visible={!hasPlans}>
          Start your investment journey by creating a plan
        </Text>
      </Box>
      <Pressable
        alignItems="center"
        bg="offWhite"
        borderRadius="xs"
        height={243}
        justifyContent="center"
        onPress={() => navigation.navigate("/home/choose-plan")}
        px="l"
        width={188}
      >
        <Box alignItems="center" gap="s">
          <Box
            alignItems="center"
            bg="paleCyan"
            borderRadius="round"
            height={44}
            justifyContent="center"
            p="sl"
            width={44}
          >
            <Icon name="plus" size="m" />
          </Box>
          <Text fontFamily="DMSans_700Bold" textAlign="center">
            Create an investment plan
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
}
