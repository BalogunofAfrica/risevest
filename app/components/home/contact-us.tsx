import { Linking } from "react-native";

import { Box, Text } from "@/components/base";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";

export function ContactUs() {
  return (
    <Box
      alignItems="center"
      bg="mainBg"
      borderRadius="s"
      elevation={8}
      flexDirection="row"
      justifyContent="space-between"
      mx="sl"
      p="sl"
      shadowColor="black"
      shadowOffset={{
        height: 2,
        width: 0,
      }}
      shadowOpacity={0.15}
      shadowRadius={10}
    >
      <Box alignItems="center" flexDirection="row" gap="s">
        <Box bg="offWhite" borderRadius="round" p="s">
          <Icon name="question" size="m" />
        </Box>
        <Text>Need help? </Text>
      </Box>
      <Button
        label="Contact us"
        onPress={() => Linking.openURL("mailto:hello@risevest.com")}
        px="l"
        py="sm"
      />
    </Box>
  );
}
