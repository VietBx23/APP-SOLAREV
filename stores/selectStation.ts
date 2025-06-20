import { IChargeStation } from "@/types";
import { create } from "zustand";

type TypeSelectStationStore = {
  chargeStation?: IChargeStation;
  selectStation: (arg?: IChargeStation) => void;
};

export const useChargeStationStore = create<TypeSelectStationStore>()(
  (set) => ({
    chargeStation: undefined,
    selectStation: (arg) => {
      set(() => ({ chargeStation: arg }));
    },
  }),
);
