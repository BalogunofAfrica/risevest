import Toast, { ToastShowParams } from "react-native-toast-message";

// eslint-disable-next-line import/no-cycle
import { ToastConfig } from "../config";

type ToastShow = ToastShowParams & {
  type: keyof ToastConfig;
};

export const toastMethods = {
  hide: () => {
    Toast.hide();
  },
  show: (params: ToastShow) => {
    Toast.show(params);
  },
};
