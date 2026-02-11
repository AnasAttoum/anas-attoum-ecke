import { showToast, ToastOptions } from "nextjs-toast-notify";

const toasterConfig: ToastOptions = {
  duration: 4000,
  progress: true,
  position: "top-center",
  transition: "slideInUp",
  icon: "",
  sound: true,
};

export const toasterSuccess = (text: string) =>
  showToast.success(text, toasterConfig);

export const toasterError = (text: string) =>
  showToast.error(text, toasterConfig);