import { BASE_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

const response = z.object({
  author: z.string(),
  quote: z.string(),
});

const getQuotes = async () => {
  const result = await fetcher(`${BASE_URL}/quotes`, {
    method: "GET",
  });

  return response.parse(result);
};

export const useGetQuotes = () =>
  useQuery({
    queryFn: getQuotes,
    queryKey: ["get-quotes"],
  });
