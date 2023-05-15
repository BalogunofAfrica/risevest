import { Box, GradientBox, Text } from "@/components/base";
import { Icon } from "@/components/icon";
import { useTheme } from "@/theme";

export function Card() {
  const theme = useTheme();

  return (
    <GradientBox
      borderColor="white"
      borderRadius="xs"
      borderWidth={1}
      colors={theme.gradientColors.white}
      locations={[0.2, 0.9]}
      mt="s"
      p="m"
      width="100%"
    >
      <Box alignItems="center" gap="sl">
        <Box alignItems="center" flexDirection="row" gap="s">
          <Text color="softText">Total Balance</Text>
          <Icon name="eye" size="sl" />
        </Box>
        <Text fontFamily="TomatoGrotesk_400Regular" variant="h3">
          $0.00
        </Text>
        <Box bg="offWhite" height={1} width={200} />
        <Box alignItems="center" flexDirection="row" gap="s">
          <Text color="softText">Total Gains</Text>
          <Icon name="up-arrow" size="sm" />
          <Text color="instructiveGreen">0.00%</Text>
          <Icon name="chevron-right" size="sm" />
        </Box>
      </Box>
    </GradientBox>
  );
}
