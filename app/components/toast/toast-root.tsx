import Toast from "react-native-toast-message";

import { toastConfig } from "./config";

export function ToastRoot() {
  return <Toast config={toastConfig} />;
}
