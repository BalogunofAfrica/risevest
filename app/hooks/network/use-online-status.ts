import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

import { toastMethods } from "@/components/toast/utils";

export function useOnlineStatus() {
  const netInfo = useNetInfo();
  const isOnline = !(
    netInfo.type !== "unknown" && netInfo.isInternetReachable === false
  );

  useEffect(() => {
    if (!isOnline) {
      toastMethods.show({
        autoHide: false,
        text1: "You appear to be offline, please reconnect",
        type: "alert",
      });
      return;
    }

    toastMethods.hide();
  }, [isOnline]);
}
