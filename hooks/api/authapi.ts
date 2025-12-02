import api from "@/lib/fetch-utils";
import { useAuthStore } from "@/store/auth";
import { loginDto, registerDto } from "@/validation/auth";

export const authApi = {
  register: async (dto: registerDto) => {
    const res = await api.post("/auth/register", dto);
    // toast.success("Account created!");
    console.log("Succes");

    return res.data;
  },

  login: async (dto: loginDto) => {
    const res = await api.post("/auth/login", dto);

    useAuthStore
      .getState()
      .setAuth(res.data.user, res.data.access_token, res.data.refresh_token);

    // toast.success("Logged in!");
    return res.data;
  },

  refresh: async () => {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) return null;

    const res = await api.post("/auth/refresh", { refreshToken });

    useAuthStore.getState().setAccessToken(res.data.access_token);
    return res.data.access_token;
  },

  logout: async () => {
    await api.post("/auth/logout");
    useAuthStore.getState().logout();
    // toast.success("Logged out!");
  },
};
