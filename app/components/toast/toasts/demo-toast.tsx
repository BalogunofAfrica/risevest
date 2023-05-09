import { ToastConfigParams } from "react-native-toast-message";

import { Box, Text } from "@/components/base";

export type DemoToastProps = unknown;

export function DemoToast({ text1 }: ToastConfigParams<DemoToastProps>) {
  return (
    <Box>
      <Text fontWeight="600" marginBottom="s" textAlign="left">
        Hello
      </Text>
      <Text textAlign="left">
        Toast
        <Text fontWeight="600">{text1}</Text>
        Toast
      </Text>
    </Box>
  );
}
