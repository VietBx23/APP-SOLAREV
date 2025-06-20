import { IHistoryCharging, IResponse, ITransactionDetail } from "@/types";
import { axiosConfig } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useStartCharging = () => {
  return useMutation({
    mutationFn: async (dto: {
      UserAppId: string;
      ChargePointId: string;
      Amount: number;
    }) => {
      const { data } = await axiosConfig.get<IResponse<{}>>(
        "/api/RequireCharging",
        { params: dto },
      );
      return data;
    },
    retry: 0,
  });
};

export const useStopCharging = () =>
  useMutation({
    mutationFn: async (dto: { ChargePointId: string }) => {
      const { data } = await axiosConfig.get<IResponse<{}>>(
        "/api/RemoteStopCharging",
        { params: dto },
      );
      return data;
    },
  });

export const useGetMeterValue = (ChargePointId?: string, enabled?: boolean) =>
  useQuery({
    queryKey: ["GetMeterValue", ChargePointId],
    queryFn: async () => {
      const { data } = await axiosConfig.get<
        IResponse<{
          soC: string;
          energy: string;
          power: string;
          voltage: string;
          temperature: string;
          current: string;
        } | null>
      >("/api/GetMeterValue", {
        params: {
          ChargePointId,
        },
      });
      return data;
    },
    enabled: enabled && Boolean(ChargePointId),
    refetchInterval: 20000,
  });

export const useHistoryCharging = (tagId?: string) =>
  useQuery({
    queryKey: ["history_charging", tagId],
    queryFn: async () => {
      try {
        const { data } = await axiosConfig.get<
          IResponse<Array<IHistoryCharging>>
        >("/api/transactions", {
          params: {
            TagId: tagId,
          },
          baseURL: process.env.EXPO_PUBLIC_API_URL_CUSTOM,
        });
        return data;
      } catch (error) {
        console.log("error", error);
      }
    },
    enabled: Boolean(tagId),
    refetchOnWindowFocus: true,
  });

export const useDetailHistoryCharging = (TransactionId?: string) =>
  useQuery({
    queryKey: ["history_detail_charging", TransactionId],
    queryFn: async () => {
      try {
        const { data } = await axiosConfig.get<
          IResponse<Array<IHistoryCharging>>
        >("/api/GetlistTransactionDetail", {
          params: {
            TransactionId,
          },
        });
        return data;
      } catch (error) {
        console.log("error", error);
      }
    },
    enabled: Boolean(TransactionId),
  });

export const useCheckPendingTransaction = () =>
  useMutation({
    mutationFn: async (userId?: string) => {
      try {
        const { data } = await axiosConfig.get<
          IResponse<null | ITransactionDetail>
        >(`/api/users/${userId}/check-charging`, {
          baseURL: process.env.EXPO_PUBLIC_API_URL_CUSTOM,
        });
        return data;
      } catch (error) {
        console.log("error_checkpending", error);
      }
    },
  });
