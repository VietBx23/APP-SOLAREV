import { IChargeStation, IChargeStationInfo, IResponse } from "@/types";
import { axiosConfig } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useChargeStation = () =>
  useQuery({
    queryKey: ["list_chargeStation"],
    queryFn: async () => {
      try {
        const { data } = await axiosConfig.get<
          IResponse<Array<IChargeStation>>
        >("/api/GetListChargeStation");
        return data;
      } catch (error) {
        console.log("error", error);
        return { data: [] };
      }
    },
  });

export const useChargeStationInfo = (code?: string) =>
  useQuery({
    queryKey: ["info_chargeStation", code],
    queryFn: async () => {
      try {
        const { data } = await axiosConfig.get<IResponse<IChargeStationInfo>>(
          "/api/GetChargePointbyId",
          {
            params: {
              ChargePointId: code,
            },
          },
        );
        return data;
      } catch (error) {
        console.log("error", error);
      }
    },
    enabled: Boolean(code),
  });
