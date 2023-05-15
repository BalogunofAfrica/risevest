import React from "react";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";

import { Box, Text } from "@/components/base";
import { Button } from "@/components/button";
import { Header } from "@/components/common";
import { px, vw } from "@/constants/layout";
import { navigation } from "@/navigation/utils";
import { useGetRates } from "@/services/api/banks";
import { useTheme } from "@/theme";

const SHEET_HEIGHT = px(500);

const Divider = () => <Box borderColor="offWhite" borderTopWidth={1} />;
const RateInfo = ({
  body,
  head,
  rate,
}: {
  body: string;
  head: string;
  rate: string;
}) => (
  <Box flexDirection="row" gap="xxs" justifyContent="space-between" p="m">
    <Box>
      <Text textAlign="left">{head}</Text>
      <Text
        color="softText"
        fontSize={13}
        style={{ maxWidth: vw(67) }}
        textAlign="left"
      >
        {body}
      </Text>
    </Box>
    <Text>₦{rate}</Text>
  </Box>
);

export function RateSheet(props: SheetProps) {
  const theme = useTheme();
  const rates = useGetRates();

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: theme.colors.mainBg,
        borderTopLeftRadius: theme.borderRadii.sm,
        borderTopRightRadius: theme.borderRadii.sm,
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
        bg="mainBg"
        borderTopLeftRadius="sm"
        borderTopRightRadius="sm"
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
          <RateInfo
            body="We buy US dollars at this rate"
            head="USD Buy Rate"
            rate={String(rates.data?.buy_rate ?? 0)}
          />
          <Divider />
          <RateInfo
            body="The current value of your investments in Naira"
            head="USD Sell Rate"
            rate={String(rates.data?.buy_rate ?? 0)}
          />
        </Box>
        <Text color="softText" variant="p">
          These exchange rates are provided by independent third parties who
          handle fund conversions at the prevailing parallel rates and are not
          set, or controlled or by Rise. They are subject to change based on
          market trends.
        </Text>
        <Button
          animation={false}
          label="Accept & Continue"
          onPress={() => {
            SheetManager.hide("rate");
            navigation.navigate("/home/select-bank");
          }}
        />
      </Box>
    </ActionSheet>
  );
}
