import { useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";

export const useHelth = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["health"],
    queryFn: () => api.get("/api/v1/health-check"),
  });
};
