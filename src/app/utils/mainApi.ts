import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

interface AxiosProps {
  url: string;
  method: Method;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  tags?: string;
  withCredentials?: boolean;
  withAuth?: boolean;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  next?: Record<string, string>;
}

const createAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const mainApi = async <T>({
  url,
  method,
  data = {},
  headers = {},
  withCredentials = false,
  withAuth = false,
}: AxiosProps): Promise<AxiosResponse<T>> => {
  try {
    //토큰은 어디에 저장할지 모르니 임시로 로컬스토리지
    const token = withAuth ? localStorage.getItem("token") : null;
    const config: CustomAxiosRequestConfig = {
      url,
      method,
      data,
      withCredentials,
      headers: {
        ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    };
    const res = await createAxios(config);
    return res;
  } catch (e: any) {
    console.error(e);
    throw e.response || e.message;
  }
};
