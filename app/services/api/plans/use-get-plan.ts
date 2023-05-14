import { BASE_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

const request = z.string();

const response = z.object({
  item_count: z.number(),
  items: z.array(
    z.object({
      created_at: z.date(),
      id: z.string(),
      invested_amount: z.number().nullable(),
      maturity_date: z.date().nullable(),
      plan_name: z.string(),
      target_amount: z.number(),
      total_returns: z.number().nullable(),
      user_id: z.string(),
    }),
  ),
});

const getPlan = async (id: z.infer<typeof request>) => {
  const requestParams = request.parse(id);
  const result = await fetcher(`${BASE_URL}/plans/${requestParams}`, {
    method: "GET",
  });

  return response.parse(result);
};

export const useGetPlan = (id: z.infer<typeof request>) =>
  useQuery({
    queryFn: () => getPlan(id),
    queryKey: ["get-plan", id],
  });
