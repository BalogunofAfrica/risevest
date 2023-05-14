import { BASE_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

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

const getPlans = async () => {
  const result = await fetcher(`${BASE_URL}/plans`, {
    method: "GET",
  });

  return response.parse(result);
};

export const useGetPlans = () =>
  useQuery({
    queryFn: getPlans,
    queryKey: ["get-plans"],
  });
