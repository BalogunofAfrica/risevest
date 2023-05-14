import { BASE_URL } from "@env";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

const request = z.object({
  email_address: z.string(),
  password: z.string(),
});

const response = z.object({
  email_address: z.string(),
  first_name: z.string(),
  id: z.string(),
  last_name: z.string(),
  token: z.string(),
  total_balance: z.number(),
  total_returns: z.number().nullable(),
  username: z.string().nullable(),
});

const signIn = async (props: z.infer<typeof request>) => {
  const body = JSON.stringify(request.parse(props));
  const result = await fetcher(`${BASE_URL}/sessions`, {
    body,
    method: "POST",
  });

  return response.parse(result);
};

export const useSignIn = () =>
  useMutation({
    mutationFn: signIn,
  });
