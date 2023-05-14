import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { toastConfig } from "./config";

export function ToastRoot() {
  const edges = useSafeAreaInsets();

  return (
    <Toast
      bottomOffset={edges.bottom}
      config={toastConfig}
      topOffset={edges.top}
    />
  );
}
