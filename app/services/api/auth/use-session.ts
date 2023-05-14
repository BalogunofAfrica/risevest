import { BASE_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

const response = z.object({
  email_address: z.string(),
  exp: z.number(),
  first_name: z.string(),
  iat: z.number(),
  id: z.string(),
  last_name: z.string(),
  total_balance: z.number(),
  total_returns: z.number(),
  username: z.string().nullable(),
});

const getSession = async () => {
  const result = await fetcher(`${BASE_URL}/sessions`, {
    method: "GET",
  });

  return response.parse(result);
};

export const useSession = () =>
  useQuery({
    queryFn: getSession,
    queryKey: ["get-session"],
  });
