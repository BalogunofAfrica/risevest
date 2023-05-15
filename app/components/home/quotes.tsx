import { Box, Text } from "@/components/base";
import { PressableSpring } from "@/components/button";
import { Icon } from "@/components/icon";
import { useGetQuotes } from "@/services/api/misc";
import { useTheme } from "@/theme";

export function Quotes() {
  const theme = useTheme();
  const getQuotes = useGetQuotes();

  if (!getQuotes.data) return null;

  return (
    <Box bg="lightGrayishCyan" borderRadius="sm" mx="sl" p="xs">
      <Box
        bg="teal"
        borderColor="teal2"
        borderRadius="s"
        borderWidth={2}
        gap="sl"
        p="sl"
      >
        <Box gap="sl">
          <Text color="white" fontFamily="DMSans_700Bold" textAlign="left">
            TODAY’S QUOTE
          </Text>
          <Box bg="white" height={1} width={28} />
          <Text color="white" textAlign="left">
            {getQuotes.data.quote}
          </Text>
        </Box>
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text color="white" fontFamily="DMSans_700Bold">
            {getQuotes.data.author}
          </Text>
          <PressableSpring>
            <Box
              borderRadius="round"
              p="sm"
              style={{
                backgroundColor: theme.rawColors.white.alpha(0.2).string(),
              }}
            >
              <Icon name="share" size="m" />
            </Box>
          </PressableSpring>
        </Box>
      </Box>
    </Box>
  );
}
