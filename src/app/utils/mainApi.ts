import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
  Method,
} from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "@/app/store/userStore";

interface AxiosProps {
  url: string;
  method: Method;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  tags?: string;
  withCredentials?: boolean;
  withAuth?: boolean;
}

interface ErrorMeta {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    };
  };
}

export const isServerApiError = (error: unknown): error is ErrorMeta => {
  return isAxiosError(error) && !!error.response;
};

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  next?: Record<string, string>;
}

const createAxios = axios.create({
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
    throw e;
  }
};

createAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { resetUser, isLogin } = useUserStore.getState();

    if (isServerApiError(error)) {
      const token = localStorage.getItem("token");

      if (error.response.data.statusCode === 401) {
        if (token) {
          if (isLogin) {
            toast.error("세션이 만료되었습니다. 로그인을 해야합니다.", {
              position: "top-right",
              autoClose: 2500,
              closeOnClick: true,
              toastId: "session-expired",
            });
            resetUser();
          }
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
