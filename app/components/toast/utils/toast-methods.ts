import Toast, { ToastShowParams } from "react-native-toast-message";

// eslint-disable-next-line import/no-cycle
import { ToastNames } from "../config";

type ToastShow = ToastShowParams & {
  type: ToastNames;
};

export const toastMethods = {
  hide: () => {
    Toast.hide();
  },
  show: (params: ToastShow) => {
    Toast.show(params);
  },
};
