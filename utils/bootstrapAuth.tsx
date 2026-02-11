
import * as SecureStore from "expo-secure-store";
import api from "@/services/api";
import { AppDispatch } from "@/store/store";
import { setAuth, logout } from "@/store/slices/authSlice";

export const bootstrapAuth = async (dispatch: AppDispatch) => {
    try {
        const token = await SecureStore.getItemAsync("token");

        if (!token) {
            dispatch(logout());
            return;
        }

        // ✅ Validate token with backend
        const res = await api.get("/users/me");

        const user = res.data.data;

    } catch (error: any) {
        console.log("Bootstrap Auth Error:", error);
    }
};
