import { ToastConfigParams } from "react-native-toast-message";

import { Box, Text } from "@/components/base";

export type AlertToastProps = ToastConfigParams<unknown>;

export function AlertToast({ text1, text2 }: AlertToastProps) {
  return (
    <Box bg="lightGrayishCyan" borderRadius="sm" mx="sl" p="xs">
      <Box
        bg="mainBg"
        borderColor="teal"
        borderRadius="s"
        borderWidth={2}
        gap="xs"
        p="s"
      >
        <Text
          fontFamily="DMSans_700Bold"
          textAlign="left"
          variant="p"
          visible={!!text1}
        >
          {text1}
        </Text>
        <Text textAlign="left" variant="p" visible={!!text2}>
          {text2}
        </Text>
      </Box>
    </Box>
  );
}
