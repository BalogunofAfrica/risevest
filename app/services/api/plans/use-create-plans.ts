import { BASE_URL } from "@env";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

const request = z.object({
  maturity_date: z.date(),
  plan_name: z.string(),
  target_amount: z.number(),
});

const response = z.object({
  created_at: z.string(),
  id: z.string(),
  invested_amount: z.number(),
  maturity_date: z.string(),
  plan_name: z.string(),
  returns: z.array(z.unknown()),
  target_amount: z.number().nullable(),
  total_returns: z.number().nullable(),
  user_id: z.string(),
});

const createPlan = async (props: z.infer<typeof request>) => {
  const body = JSON.stringify(request.parse(props));
  const result = await fetcher(`${BASE_URL}/plans`, {
    body,
    method: "POST",
  });

  return response.parse(result);
};

export const useCreatePlan = () =>
  useMutation({
    mutationFn: createPlan,
  });
