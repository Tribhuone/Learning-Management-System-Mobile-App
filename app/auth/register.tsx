
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";
import api from "@/services/api";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSignup = async () => {
        if (!email || !username || !password) {
            Alert.alert("Error", "Fill all fields");
            return;
        }

        try {
            await api.post("/users/register", {
                email,
                username,
                password,
                role: "ADMIN",
            });

            Alert.alert("Success", "Account Created");

            router.replace("/auth/login");
        } catch (err: any) {
            Alert.alert(
                "Signup Failed",
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
                marginTop: -60,
            }}>
                <View className="flex-1 justify-center p-6">
                    <Text className="text-2xl font-bold mb-6">Signup</Text>

                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#919191ff"
                        value={email}
                        onChangeText={setEmail}
                        className="border text-black p-3 mb-3 rounded-xl border border-gray-500"
                    />

                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#919191ff"
                        value={username}
                        onChangeText={setUsername}
                        className="border text-black p-3 mb-3 rounded-xl border border-gray-500"
                    />

                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#919191ff"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        className="border text-black p-3 mb-4 rounded-xl border border-gray-500"
                    />

                    <TouchableOpacity
                        className="bg-cyan-600 p-3 rounded mx-auto w-[70%] rounded-xl"
                        onPress={handleSignup}
                    >
                        <Text className="text-white text-center">Register</Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-center mt-4">
                        <Text className="text-gray-500">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/auth/login")}>
                            <Text className="text-cyan-600">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
