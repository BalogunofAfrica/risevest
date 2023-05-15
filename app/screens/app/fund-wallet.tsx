import { FlatList } from "react-native";

import { Box, Screen, Text } from "@/components/base";
import { Pressable } from "@/components/button";
import { Header } from "@/components/common";
import { Icon } from "@/components/icon";
import { sheetMethods } from "@/components/sheet";
import { wpx } from "@/constants";

const optionsData = [
  {
    body: "Timeline - 15 mins",
    head: "Naira Bank Transfer",
    icon: "bank",
  },
  {
    body: "Timeline - 15 mins",
    head: "Naira Debit card",
    icon: "card",
  },
  {
    body: "Timeline - 15 mins",
    head: "Naira Direct Debit",
    icon: "ngn-bank",
  },
  {
    body: "Timeline - 1 business day",
    head: "USD Debit/Credit Card",
    icon: "usd-card",
  },
  {
    body: "Timeline - 15 mins",
    head: "Crypto",
    icon: "btc",
  },
] as const;

const FundOptions = (props: (typeof optionsData)[number]) => (
  <Pressable
    alignItems="center"
    borderBottomWidth={1}
    borderColor="offWhite"
    flexDirection="row"
    justifyContent="space-between"
    onPress={() => sheetMethods.show("rate")}
    py="m"
  >
    <Box flexDirection="row" gap="sm">
      <Box
        alignItems="center"
        aspectRatio={1}
        bg="offWhite"
        borderRadius="round"
        justifyContent="center"
        width={wpx(42)}
      >
        <Icon name={props.icon} size="sl" />
      </Box>
      <Box>
        <Text textAlign="left">{props.head}</Text>
        <Text color="softText" fontSize={13} textAlign="left">
          {props.body}
        </Text>
      </Box>
    </Box>
    <Box>
      <Text color="softText" fontSize={13} textAlign="right">
        Rate - $1 = ₦490
      </Text>
      <Text color="softText" fontSize={13} textAlign="right">
        Fee - 1.5%
      </Text>
    </Box>
  </Pressable>
);

export function FundWallet() {
  return (
    <Screen bg="mainBg" px="sl">
      <Header icon="cancel" text="Fund Wallet" />
      <FlatList
        contentContainerStyle={{
          paddingTop: 20,
        }}
        data={optionsData}
        keyExtractor={(item) => item.icon}
        renderItem={({ item }) => <FundOptions {...item} />}
      />
    </Screen>
  );
}
