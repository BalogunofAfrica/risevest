import { HttpError } from "@/utils/classes";

export function throwApiException(message: string, status?: string | number) {
  const error = new HttpError({
    message,
    status,
  });

  throw error;
}
