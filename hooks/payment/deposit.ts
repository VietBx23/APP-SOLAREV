import { useAuthStore } from "@/stores";
import { IAddDeposit, IDepositHistory, IResponse, TYPE_STORE } from "@/types";
import { axiosConfig } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useStorageState } from "../useStorageState";

export const useListDeposit = (id?: string) =>
  useQuery({
    queryKey: ["list_deposit", id],
    queryFn: async () => {
      const { data } = await axiosConfig.get<IResponse<Array<IDepositHistory>>>(
        "/api/GetDepositHistory",
        {
          params: {
            UserAppId: id,
          },
        },
      );
      return data;
    },
    enabled: Boolean(id),
  });

export const useAddDeposit = () => {
  return useMutation({
    mutationFn: async (dto: IAddDeposit) => {
      const { data } = await axiosConfig.post<
        IResponse<{ payment_url: string; vnp_TxnRef: string; tmnCode: string }>
      >("/api/AddDeposit", dto);
      return data;
    },
  });
};

export const useGetBalance = () => {
  const { user, setInfo } = useAuthStore();
  const [[], setSession] = useStorageState(TYPE_STORE.AUTHEN);

  return useQuery({
    queryKey: ["get_balance", user?.id],
    queryFn: async () => {
      const { data } = await axiosConfig.get<IResponse<number>>(
        "/api/GetCurrentBalance",
        {
          params: {
            UserAppId: user?.id,
          },
        },
      );
      if (data.statusCode === 200) {
        if (user) {
          setInfo({ ...user, balance: data.data });
          setSession(JSON.stringify({ ...user, balance: data.data }));
        }
      }
      return data;
    },
    enabled: Boolean(user?.id),
  });
};
