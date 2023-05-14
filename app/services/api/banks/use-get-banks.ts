import { BASE_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/services/api/fetcher";

const response = z.unknown();

const getBanks = async () => {
  const result = await fetcher(`${BASE_URL}/banks`, {
    method: "GET",
  });

  return response.parse(result);
};

export const useGetBanks = () =>
  useQuery({
    queryFn: getBanks,
    queryKey: ["get-banks"],
  });
