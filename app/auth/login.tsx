import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import api from "@/services/api";

import { setAuth } from "@/store/slices/authSlice";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Fill all fields");
            return;
        }

        try {
            const res = await api.post("/users/login", {
                username,
                password,
            });

            const { user, accessToken, refreshToken } = res.data.data;

            // ✅ Save token securely
            await SecureStore.setItemAsync("token", accessToken);
            if (refreshToken) {
                await SecureStore.setItemAsync("refreshToken", refreshToken);
            }

            // ✅ Update redux
            dispatch(setAuth({ user, token: accessToken }));

            router.replace("/(tabs)");
        } catch (err: any) {
            Alert.alert(
                "Login Failed",
                err.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
        >
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                paddingHorizontal: 10,
                marginTop: -50,
            }}>
                <View className="justify-center p-6">
                    <Text className="text-2xl font-bold mb-6">Login</Text>

                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#919191ff"
                        value={username}
                        onChangeText={setUsername}
                        className="border text-black p-3 mb-3 rounded-xl border border-gray-500"
                    />

                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor="#919191ff"
                        value={password}
                        onChangeText={setPassword}
                        className="border text-black p-3 mb-4 rounded-xl border border-gray-500"
                    />

                    <TouchableOpacity
                        className="bg-cyan-600 p-3 rounded-xl w-[70%] mx-auto"
                        onPress={handleLogin}
                    >
                        <Text className="text-white text-center">Login</Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-center mt-4">
                        <Text className="text-gray-500">Don't have an account? </Text>
                        <Pressable onPress={() => router.push("/auth/register")}>
                            <Text className="text-cyan-600">Register</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
