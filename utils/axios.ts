import axios, { AxiosError } from "axios";

const BaseUrl = process.env.EXPO_PUBLIC_API_URL;

const axiosServices = axios.create({
  baseURL: BaseUrl,
  headers: {
    Accept: "application/json",
  },
});

axiosServices.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("error from axios config", error);
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services",
    );
  },
);

export default axiosServices;
