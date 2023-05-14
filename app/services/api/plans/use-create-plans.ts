import { BASE_URL } from "@env";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

const request = z.object({
  date_of_birth: z.string(),
  email_address: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  password: z.string(),
});

const response = z.object({
  created_at: z.string(),
  date_of_birth: z.string(),
  email_address: z.string(),
  first_name: z.string(),
  id: z.string(),
  last_name: z.string(),
  phone_number: z.string().nullable(),
  username: z.string().nullable(),
});

const createPlans = async (props: z.infer<typeof request>) => {
  const body = JSON.stringify(request.parse(props));
  const result = await fetcher(`${BASE_URL}/plans`, {
    body,
    method: "POST",
  });

  return response.parse(result);
};

export const useCreatePlans = () =>
  useMutation({
    mutationFn: createPlans,
  });
