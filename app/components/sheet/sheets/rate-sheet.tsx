import React from "react";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";

import { Box, Text } from "@/components/base";
import { Button } from "@/components/button";
import { Header } from "@/components/common";
import { px } from "@/constants/layout";
import { useTheme } from "@/theme";

const SHEET_HEIGHT = px(500);

const Divider = () => <Box borderColor="offWhite" borderTopWidth={1} />;
const RateInfo = () => (
  <Box flexDirection="row" gap="xxs" justifyContent="space-between" p="m">
    <Box>
      <Text textAlign="left">USD Buy Rate</Text>
      <Text color="softText" fontSize={13} textAlign="left">
        We buy US dollars at this rate
      </Text>
    </Box>
    <Text>₦490</Text>
  </Box>
);

export function RateSheet(props: SheetProps) {
  const theme = useTheme();

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: theme.colors.mainBg,
        borderTopLeftRadius: theme.borderRadii.s,
        borderTopRightRadius: theme.borderRadii.s,
        overflow: "hidden",
        padding: 0,
      }}
      defaultOverlayOpacity={0.4}
      gestureEnabled
      id={props.sheetId}
      indicatorStyle={{
        height: 0,
      }}
    >
      <Box
        backgroundColor="mainBg"
        borderTopLeftRadius="xxl"
        borderTopRightRadius="xxl"
        gap="l"
        height={SHEET_HEIGHT}
        pb="sl"
        pt="l"
        px="l"
      >
        <Header
          icon="cancel"
          onIconPress={SheetManager.hideAll}
          text="About Exchange Rates"
          textProps={{
            fontFamily: "DMSans_400Regular",
            fontSize: 20,
          }}
        />
        <Box borderBottomWidth={1} borderColor="offWhite" borderTopWidth={1}>
          <RateInfo />
          <Divider />
          <RateInfo />
        </Box>
        <Text color="softText" variant="p">
          These exhange rates are provided by independent third parties who
          handle fund conversions at the prevailing parallel rates and are not
          set, or controlled or by Rise. They are subject to change based on
          market trends.
        </Text>
        <Button animation={false} label="Accept & Continue" />
      </Box>
    </ActionSheet>
  );
}
