import { FlatList } from "react-native";

import { Box, Screen, Text } from "@/components/base";
import { Header } from "@/components/common";
import { Icon } from "@/components/icon";
import { useTheme } from "@/theme";

const Banks = () => (
  <Box
    alignItems="center"
    borderBottomWidth={1}
    borderColor="offWhite"
    flexDirection="row"
    justifyContent="space-between"
    py="m"
  >
    <Box gap="xxs">
      <Text fontFamily="TomatoGrotesk_400Regular" textAlign="left">
        0123456789 • <Text color="softText">GTBank PLC</Text>
      </Text>
      <Text textAlign="left">Bosun Olanrewaju</Text>
    </Box>
    <Icon name="chevron-right" size="m" />
  </Box>
);

export function SelectBank() {
  const theme = useTheme();

  return (
    <Screen bg="mainBg" edges={["top"]}>
      <Header icon="back-arrow" mx="sl" text="Select bank" />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.sl,
          paddingTop: theme.spacing.m,
        }}
        data={Array.from({ length: 2 }, (_, index) => `${index}`)}
        renderItem={Banks}
      />
    </Screen>
  );
}
