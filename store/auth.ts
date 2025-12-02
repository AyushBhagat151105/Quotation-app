import { create } from "zustand";
import { tokenStorage } from "../lib/secure-storage";

export const useAuthStore = create<{
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  isInitialized: boolean;
  setAuth: (user: any, access: string, refresh: string) => Promise<void>;
  setAccessToken: (access: string) => void;
  logout: () => Promise<void>;
  restore: () => Promise<void>;
}>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isInitialized: false,

  setAuth: async (user, accessToken, refreshToken) => {
    await tokenStorage.set("access_token", accessToken);
    await tokenStorage.set("refresh_token", refreshToken);

    set({ user, accessToken, refreshToken });
  },

  setAccessToken: (accessToken) => set({ accessToken }),

  logout: async () => {
    await tokenStorage.remove("access_token");
    await tokenStorage.remove("refresh_token");
    set({ user: null, accessToken: null, refreshToken: null });
  },

  restore: async () => {
    const access = await tokenStorage.get("access_token");
    const refresh = await tokenStorage.get("refresh_token");

    set({
      accessToken: access,
      refreshToken: refresh,
      isInitialized: true,
    });
  },
}));
