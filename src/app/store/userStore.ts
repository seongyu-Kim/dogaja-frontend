import { create } from "zustand";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";

type User = {
  name: string;
  email: string;
} | null;

type UserState = {
  user: User;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  error: null,

  fetchUser: async () => {
    try {
      const response = await mainApi({
        url: API.USER.MY_INFO_GET,
        method: "GET",
        withAuth: true,
      });

      const userData = response.data as User;
      set({ user: userData });
      //
    } catch (e) {
      console.error("fetchUser", e);
    }
  },
}));
