
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 10000,
});


// ✅ Attach token automatically
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// ✅ Basic Refresh Token Handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await SecureStore.getItemAsync("refreshToken");

                if (!refreshToken) throw error;

                const res = await axios.post(
                    "https://api.freeapi.app/api/v1/users/refresh-token",
                    { refreshToken }
                );

                const newToken = res.data.data.accessToken;

                await SecureStore.setItemAsync("token", newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                await SecureStore.deleteItemAsync("token");
                await SecureStore.deleteItemAsync("refreshToken");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
