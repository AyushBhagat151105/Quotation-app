import { Quotation, QuotationListResponse, Status } from "@/types/status";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";

export const useDashboard = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        const res = await api.get<Status>("/quotations/admin/stats");

        return res.data;
      } catch (error) {
        console.log("Error on status:- ", error);
        throw error;
      }
    },
  });
};

export const useQuotationsList = (page: number, limit = 10) => {
  const api = useApi();

  return useQuery<QuotationListResponse>({
    queryKey: ["quotations", page],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      const res = await api.get<QuotationListResponse>(
        `/quotations/admin?take=${limit}&skip=${skip}`
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};

export const useGetQuotation = (id: string) => {
  const api = useApi();

  return useQuery<Quotation>({
    queryKey: ["quotation", id],
    queryFn: async () => {
      const res = await api.get<Quotation>(`/quotations/${id}`);
      return res.data;
    },
  });
};
