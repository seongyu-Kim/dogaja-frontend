import { create } from "zustand";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { isAxiosError } from "axios";

type User = {
  name: string;
  email: string;
  admin: boolean;
} | null;

type UserState = {
  user: User;
  isLogin: boolean;
  resetUser: () => void;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLogin: false,
  error: null,
  resetUser: () => {
    set({ user: null, isLogin: false });
    localStorage.removeItem("token");
  },

  fetchUser: async () => {
    try {
      const response = await mainApi({
        url: API.USER.MY_INFO_GET,
        method: "GET",
        withAuth: true,
      });

      const userData = response.data as User;
      const statusCode = response.status;
      if (statusCode === 200) {
        set({ user: userData, isLogin: true });
        return;
      }
      set({ user: null });
      //
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.status === 401) {
          set({ user: null, isLogin: false });
          localStorage.removeItem("token");
        }
      }
    }
  },
}));
