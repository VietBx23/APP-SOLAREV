import { IInfo } from "@/types";
import { create } from "zustand";

type TypeAuthStore = {
  user?: IInfo;
  setInfo: (arg?: IInfo) => void;
  isLoading: boolean;
};

export const useAuthStore = create<TypeAuthStore>()((set) => {
  return {
    user: undefined,
    isLoading: true,
    setInfo: (arg) => {
      set(() => ({ user: arg, isLoading: false }));
    },
  };
});
