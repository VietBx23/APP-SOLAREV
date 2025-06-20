import { IResponse, ITransactionDetail } from "@/types";
import { axiosConfig } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useHistoryPayment = () =>
  useQuery({
    queryKey: ["history_payment"],
  });

export const useDetailTransaction = (id?: string) =>
  useQuery({
    queryKey: ["transaction_detail", id],
    queryFn: async () => {
      const { data } = await axiosConfig.get<
        IResponse<Array<ITransactionDetail>>
      >("/api/GetlistTransactionDetail", {
        params: {
          TransactionId: id,
        },
      });
      return data.data[0] || {};
    },
    enabled: Boolean(id),
  });
