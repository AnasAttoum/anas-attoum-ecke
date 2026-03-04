import { toasterError, toasterSuccess } from "@/components/toaster/toaster";
import { _Translator } from "next-intl";

export const checkIfResIsOk = async (
  t: _Translator,
  res: Response,
  router: { refresh(): void },
) => {
  if (!res.ok) {
    if (res.status === 401) router.refresh();
    throw new Error(t((await res.json())?.message || "toaster.error"));
  }

  const data = await res.json();
  toasterSuccess(t(data.message));
};

export const catchError = async (t: _Translator, error: Error | unknown) => {
  if (error instanceof Error) {
    toasterError(error?.message || t("toaster.error"));
  } else {
    toasterError(t("toaster.error"));
  }
};
