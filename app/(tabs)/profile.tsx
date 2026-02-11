
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { logout, setAuth } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";

export default function Profile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const [uploading, setUploading] = useState(false);

    // Mock stats if not available in user object
    const coursesEnrolled = user?.coursesEnrolled || 8; // Default mock value
    const progress = user?.progress || 75; // Default mock value

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    await SecureStore.deleteItemAsync("token");
                    await SecureStore.deleteItemAsync("refreshToken");
                    dispatch(logout());
                    router.replace("/auth/login");
                },
            },
        ]);
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Permission Denied", "Sorry, we need camera roll permissions to make this work!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri: string) => {
        setUploading(true);
        try {
            // In a real app, you would upload the file to a server here using FormData
            // For now, we'll just update the local state to show the new image
            // effectively mocking the upload

            // Mock update logic
            if (user && token) {
                const updatedUser = {
                    ...user,
                    avatar: { url: uri }
                };
                dispatch(setAuth({ user: updatedUser, token }));
            }

        } catch (error) {
            Alert.alert("Error", "Failed to upload profile picture");
            console.log(error);
        } finally {
            setUploading(false);
        }
    };

    if (!user) {
        return (
            <View className="flex-1 justify-center items-center bg-white p-4">
                <Text className="text-gray-500 mb-4">You are not logged in.</Text>
                <TouchableOpacity onPress={() => router.replace("/auth/login")} className="bg-cyan-600 px-6 py-3 rounded-full">
                    <Text className="text-white font-bold">Login</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
            <View className="items-center py-8 bg-cyan-50/50">
                <TouchableOpacity onPress={pickImage} disabled={uploading}>
                    <View className="relative">
                        <Image
                            source={{ uri: user.avatar?.url || `https://ui-avatars.com/api/?name=${user.fullName || user.username}&background=random` }}
                            className="w-28 h-28 rounded-full border-4 border-white bg-gray-50/40"
                        />
                        <View className="absolute bottom-0 right-1 bg-cyan-600 p-2 rounded-full border-2 border-white">
                            {uploading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Ionicons name="camera" size={16} color="white" />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>

                <Text className="text-2xl font-bold mt-4 text-gray-800">{user.fullName || user.username}</Text>
                <Text className="text-gray-500 font-medium">{user.email}</Text>
                <View className="bg-cyan-100 px-4 py-1.5 rounded-full mt-3">
                    <Text className="text-cyan-700 text-xs font-bold uppercase tracking-wide">{user.role}</Text>
                </View>
            </View>

            {/* Stats */}
            <View className="flex-row justify-around py-6 mx-4 bg-white rounded-xl shadow-sm border border-gray-100 -mt-6">
                <View className="items-center w-1/2 border-r border-gray-100">
                    <Text className="text-2xl font-bold text-gray-800">{coursesEnrolled}</Text>
                    <Text className="text-gray-500 text-sm font-medium">Courses Enrolled</Text>
                </View>
                <View className="items-center w-1/2">
                    <Text className="text-2xl font-bold text-gray-800">{progress}%</Text>
                    <Text className="text-gray-500 text-sm font-medium">Avg. Progress</Text>
                </View>
            </View>

            {/* Actions */}
            <View className="px-4 py-6">
                <Text className="text-gray-900 font-bold text-lg mb-4 ml-2">Account</Text>

                <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-xl mb-3 active:bg-gray-100">
                    <View className="bg-white p-2 rounded-full shadow-sm">
                        <Ionicons name="settings-outline" size={22} color="#4b5563" />
                    </View>
                    <Text className="ml-4 text-base font-medium text-gray-700 flex-1">Settings</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-xl mb-3 active:bg-gray-100">
                    <Text className="ml-4 text-base font-medium text-gray-700 flex-1">Help & Support</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/course/webview?id=101")}
                    className="flex-row items-center p-4 bg-cyan-50 rounded-xl mb-3 active:bg-cyan-100 border border-cyan-100"
                >
                    <View className="bg-white p-2 rounded-full shadow-sm">
                        <Ionicons name="globe-outline" size={22} color="#00ACC1" />
                    </View>
                    <Text className="ml-4 text-base font-medium text-cyan-700 flex-1">Open Course WebView</Text>
                    <Ionicons name="chevron-forward" size={20} color="#00ACC1" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout} className="flex-row items-center p-4 bg-red-50 rounded-xl mt-4 active:bg-red-100">
                    <View className="bg-white p-2 rounded-full shadow-sm">
                        <Ionicons name="log-out-outline" size={22} color="#ef4444" />
                    </View>
                    <Text className="ml-4 text-base text-red-600 font-bold flex-1">Logout</Text>
                </TouchableOpacity>
            </View>

            <View className="h-20" />
        </ScrollView>
    );
}