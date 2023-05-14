import { z } from "zod";

import { FunctionParameter } from "@/utils/types";

import { throwApiException } from "./throw-api-exception";

const defaultInit = {
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  redirect: "follow",
  referrerPolicy: "no-referrer",
} as const;

const errorJson = z.object({
  message: z.string(),
});

export const fetcher = (...args: FunctionParameter<typeof fetch>) =>
  fetch(args[0], {
    ...defaultInit,
    ...args[1],
  }).then(async (response) => {
    const json = await response.json();
    if (!response.ok) {
      const apiError = errorJson.parse(json);
      throwApiException(apiError.message, response.status);
    }
    return json;
  });
