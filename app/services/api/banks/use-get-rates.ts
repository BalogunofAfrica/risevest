import { BASE_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

const response = z.object({
  buy_rate: z.number(),
  sell_rate: z.number(),
});

const getRates = async () => {
  const result = await fetcher(`${BASE_URL}/rates`, {
    method: "GET",
  });

  return response.parse(result);
};

export const useGetRates = () =>
  useQuery({
    queryFn: getRates,
    queryKey: ["get-rates"],
  });
