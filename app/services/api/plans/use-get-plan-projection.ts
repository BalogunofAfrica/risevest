import { BASE_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

const request = z.object({
  maturity_date: z.string(),
  monthly_investment: z.number(),
  target_amount: z.number(),
});

const response = z.object({
  item_count: z.number().nullish(),
  items: z
    .array(
      z.object({
        created_at: z.string(),
        id: z.string(),
        invested_amount: z.number().nullable(),
        maturity_date: z.string().nullable(),
        plan_name: z.string(),
        target_amount: z.number(),
        total_returns: z.number().nullable(),
        user_id: z.string(),
      }),
    )
    .nullish(),
  total_invested: z.number().nullish(),
  total_returns: z.number().nullish(),
});

const getPlanProjection = async (props: z.infer<typeof request>) => {
  const requestParams = request.parse(props);
  const result = await fetcher(
    `${BASE_URL}/plans/projection?monthly_investment=${requestParams.monthly_investment}&maturity_date=${requestParams.maturity_date}&target_amount=${requestParams.target_amount}`,
    {
      method: "GET",
    },
  );

  return response.parse(result);
};

export const useGetPlanProjection = (props: z.infer<typeof request>) =>
  useQuery({
    queryFn: () => getPlanProjection(props),
    queryKey: [
      "get-plan-projection",
      props.maturity_date,
      props.monthly_investment,
    ],
  });
