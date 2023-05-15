import { CommonActions, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet } from "react-native";

import { planHeaderBg } from "@/assets/images";
import { Box, ImageBox, ScrollBox, Text } from "@/components/base";
import { Button, Pressable } from "@/components/button";
import { Icon } from "@/components/icon";
import { px, vw } from "@/constants";
import { useAppRoute } from "@/hooks/navigation";
import { useGetPlan } from "@/services/api/plans";
import { format } from "@/utils/functions";

function Header({ planName }: { planName: string }) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "/app" }],
      }),
    );
  };

  return (
    <Box
      alignItems="flex-end"
      flexDirection="row"
      height={px(150)}
      justifyContent="space-between"
      overflow="hidden"
      pb="xl"
      px="sl"
    >
      <ImageBox
        height={px(300)}
        source={planHeaderBg}
        style={StyleSheet.absoluteFillObject}
        zIndex={-2}
      />
      <Pressable
        bg="transparentBlack"
        borderRadius="round"
        onPress={onPress}
        p="s"
      >
        <Icon
          name="forward-arrow"
          size="m"
          style={{
            transform: [{ rotate: "180deg" }],
          }}
        />
      </Pressable>
      <Box
        alignItems="center"
        pb="xl"
        position="absolute"
        width={vw(100)}
        zIndex={-1}
      >
        <Text color="white" fontFamily="TomatoGrotesk_700Bold" variant="h4">
          {planName}
        </Text>
        {/* <Text color="white">for Kate Ventures</Text> */}
      </Box>
      <Pressable
        bg="transparentBlack"
        borderRadius="round"
        onPress={onPress}
        p="s"
      >
        <Icon name="ellipses" size="m" />
      </Pressable>
    </Box>
  );
}

function Summary({ text, title }: { text: string; title: string }) {
  return (
    <Box
      borderBottomWidth={1}
      borderColor="offWhite"
      flexDirection="row"
      justifyContent="space-between"
      py="sm"
    >
      <Text color="softText">{title}</Text>
      <Text fontFamily="TomatoGrotesk_400Regular">{text}</Text>
    </Box>
  );
}

export function ViewPlan() {
  const route = useAppRoute<"/home/view-plan">();
  const plan = useGetPlan(route.params.planId);

  return (
    <Box bg="mainBg" flex={1}>
      <Header planName={plan.data?.plan_name ?? ""} />
      <ScrollBox px="sl">
        <Box gap="l" mb="Ml">
          <Box gap="sl" mt="l">
            <Box gap="xs">
              <Text color="softText" variant="p">
                Plan Balance
              </Text>
              <Text fontFamily="TomatoGrotesk_700Bold" variant="h4">
                ${format(plan.data?.target_amount ?? 0)}
              </Text>
              <Text color="softText">~ ₦0.00</Text>
            </Box>
            <Box gap="xs">
              <Text>Gains</Text>
              <Text
                color="instructiveGreen"
                fontFamily="TomatoGrotesk_400Regular"
              >
                +$5,000.43 • +12.4%
              </Text>
            </Box>
          </Box>
          <Box
            alignSelf="center"
            bg="offWhite"
            borderRadius="m"
            px="sm"
            py="s"
            width="auto"
          >
            <Text fontSize={13}>Results are updated monthly</Text>
          </Box>
          <Button icon="plus" label="Fund plan" variant="secondary" />
          <Box>
            <Summary text="$12,000.09" title="Total earnings" />
            <Summary text="$12,000.09" title="Current earnings" />
            <Summary text="$50,543.05" title="Deposit value" />
            <Summary text="₦31,918,837.5" title="Balance in Naira (*₦505)" />
            <Summary
              text={new Date(plan.data?.created_at ?? "").toDateString()}
              title="Plan created on"
            />
            <Summary
              text={new Date(plan.data?.maturity_date ?? "").toDateString()}
              title="Maturity date"
            />
          </Box>
        </Box>
      </ScrollBox>
    </Box>
  );
}
