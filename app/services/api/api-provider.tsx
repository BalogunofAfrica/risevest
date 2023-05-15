import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppStateStatus } from "react-native";

import { toastMethods } from "@/components/toast";
import { isWeb } from "@/constants";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        if (error instanceof Error) {
          toastMethods.show({
            text1: "Error",
            text2: error.message,
            type: "alert",
          });
        }
      },
    },
    queries: {
      refetchOnReconnect: "always",
      retry: 3,
      suspense: false,
    },
  },
});

export function onAppStateChange(status: AppStateStatus) {
  if (!isWeb) {
    focusManager.setFocused(status === "active");
  }
}

export function ApiProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
