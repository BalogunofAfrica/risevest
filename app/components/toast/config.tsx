import { AlertToast, AlertToastProps } from "./toasts";

type ToastConfig = {
  alert(props: AlertToastProps): JSX.Element;
};
export type ToastNames = keyof ToastConfig;

export const toastConfig: ToastConfig = {
  alert: AlertToast,
};
