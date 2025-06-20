import { useAuthStore } from "@/stores";
import { IInfo, IResponse, TYPE_STORE } from "@/types";
import { axiosConfig } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useStorageState } from "../useStorageState";

export type IDtoLogin = {
  username: string;
  password: string;
};

export type IDtoRegister = {
  username: string;
  password: string;
  email: string;
  phone: string;
  fullname: string;
};

export const useLogin = () => {
  const [[], setSession] = useStorageState(TYPE_STORE.AUTHEN);
  return useMutation({
    mutationFn: async (dto: IDtoLogin) => {
      try {
        const { data } = await axiosConfig.post<IResponse<IInfo>>(
          "/api/Login",
          dto,
        );
        return data;
      } catch (error) {
        console.log("error", error);
      }
    },
    onSuccess(data, variables, context) {
      setSession(JSON.stringify(data?.data));
    },
  });
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: async ({ userEmail }: { userEmail: string }) => {
      try {
        const { data } = await axiosConfig.get<IResponse<null>>(
          "/api/GetForgotPassword",
          { params: { userEmail } },
        );
        return data;
      } catch (error) {
        console.log("error", error);
      }
    },
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async (dto: IDtoRegister) => {
      try {
        const { data } = await axiosConfig.post<IResponse<null>>(
          "/api/register",
          dto,
        );
        return data;
      } catch (error) {
        console.log("error", error);
      }
    },
  });

export const useChangePassword = () =>
  useMutation({
    mutationFn: async (dto: {
      username: string;
      newpassword: string;
      OldPassword: string;
      UserAppId: string;
    }) => {
      try {
        const { data } = await axiosConfig.post<IResponse<{}>>(
          "/api/ChangePassword",
          dto,
        );
        return data;
      } catch (error) {
        console.log("error", error);
      }
    },
  });

export const useChangeProfile = () => {
  const { user, setInfo } = useAuthStore();
  const [[], setSession] = useStorageState(TYPE_STORE.AUTHEN);
  return useMutation({
    mutationFn: async (dto: {
      fullname: string;
      phone: string;
      email: string;
      id: string;
    }) => {
      try {
        const { data } = await axiosConfig.post<IResponse<{}>>(
          "/api/UpdateUser",
          dto,
        );
        return data;
      } catch (error) {
        console.log("error", error);
      }
    },
    onSuccess(data, variables, context) {
      if (user) {
        setInfo({
          ...user,
          fullname: variables.fullname,
          phone: variables.phone,
          email: variables.email,
        });
        setSession(
          JSON.stringify({
            ...user,
            fullname: variables.fullname,
            phone: variables.phone,
            email: variables.email,
          }),
        );
      }
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async (UserAppId: string) => {
      try {
        const { data } = await axiosConfig.get<IResponse<{}>>(
          "/api/DeleteUser",
          {
            params: {
              UserAppId,
            },
          },
        );
        return data;
      } catch (error) {
        console.log("error", error);
      }
    },
  });
};
