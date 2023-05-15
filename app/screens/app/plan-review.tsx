import { useNavigation } from "@react-navigation/native";

import { weddingPlan } from "@/assets/images";
import { Box, Screen, ScrollBox, Text } from "@/components/base";
import { Button } from "@/components/button";
import { Header } from "@/components/common";
import { Icon } from "@/components/icon";
import { px, vw } from "@/constants";
import { useAppRoute } from "@/hooks/navigation";
import { useCreatePlan } from "@/services/api/plans";
import { format } from "@/utils/functions";

const commonProps = {
  aspectRatio: 1,
  borderRadius: "round",
  height: px(9),
} as const;

export function PlanReview() {
  const createPlan = useCreatePlan();
  const navigation = useNavigation();
  const route = useAppRoute<"/home/plan-review">();
  const plan = route.params;
  const created = new Date();
  const maturity = new Date(plan?.withdrawDate ?? "");
  const monthsApart = Math.abs(
    (created.getFullYear() - maturity.getFullYear()) * 12 +
      (created.getMonth() - maturity.getMonth()),
  );
  const estimated = format(
    (Number(plan?.savingAmount ?? 0) / monthsApart).toFixed(2),
  );

  return (
    <Screen bg="mainBg" px="sl">
      <Header icon="cancel" text="Review" />
      <ScrollBox py="sl">
        <Box gap="sl">
          <Box gap="xs">
            <Text color="softText" variant="p">
              {plan?.savingPurpose}
            </Text>
            <Text fontFamily="TomatoGrotesk_700Bold" variant="h4">
              ${format(Number(plan?.savingAmount ?? ""))}
            </Text>
            <Text>by {maturity.toDateString()}</Text>
          </Box>
          <Box flexDirection="row" gap="l" justifyContent="center">
            <Box alignItems="center" flexDirection="row" gap="s">
              <Box bg="darkGrayishBlue" {...commonProps} />
              <Text variant="p">Investments • $0</Text>
            </Box>
            <Box alignItems="center" flexDirection="row" gap="s">
              <Box bg="teal" {...commonProps} />
              <Text variant="p">Returns • $0</Text>
            </Box>
          </Box>
        </Box>
        <Box gap="xl" mt="m">
          <Box flexDirection="row" justifyContent="space-between">
            <Text color="softText">Estimated monthly investment</Text>
            <Text fontFamily="TomatoGrotesk_400Regular" fontSize={14}>
              ${estimated}
            </Text>
          </Box>
          <Box bg="lightStroke" height={1} width="100%" />
          <Box
            alignItems="center"
            bg="offWhite"
            borderRadius="xs"
            flexDirection="row"
            gap="m"
            p="m"
          >
            <Icon name="notice" />
            <Text
              color="softText"
              style={{ maxWidth: vw(70) }}
              textAlign="left"
            >
              Returns not guaranteed. Investing involves risk. Read our
              Disclosures.
            </Text>
          </Box>
          <Text color="softText" variant="p">
            These are your starting settings, they can always be updated.
          </Text>
          <Box gap="s">
            <Button
              isLoading={createPlan.isLoading}
              label="Agree & Continue"
              onPress={() =>
                createPlan.mutate(
                  {
                    maturity_date: maturity,
                    plan_name: plan.savingPurpose,
                    target_amount: Number(plan.savingAmount),
                  },
                  {
                    onSuccess: (data) => {
                      navigation.navigate("/home/plan-created", {
                        planId: data?.id ?? "",
                      });
                    },
                  },
                )
              }
            />
            <Button
              label="Start over"
              onPress={() =>
                navigation.navigate("/home/create-plan", {
                  body: "",
                  image: weddingPlan,
                  title: "",
                })
              }
              variant="secondary"
            />
          </Box>
        </Box>
      </ScrollBox>
    </Screen>
  );
}
