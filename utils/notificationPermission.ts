
import { canUseNotifications } from "./notificationSafe";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "notification_permission_requested";

export const requestNotificationPermissionOnce = async () => {
    if (!canUseNotifications) return;

    try {
        const alreadyAsked = await AsyncStorage.getItem(STORAGE_KEY);

        const { status } = await Notifications.getPermissionsAsync();

        // ✅ If not granted → ask again
        if (status !== "granted") {
            await Notifications.requestPermissionsAsync();
        }

        // ✅ Mark as asked (only after check)
        if (!alreadyAsked) {
            await AsyncStorage.setItem(STORAGE_KEY, "true");
        }

    } catch (error) {
        console.log("Notification permission error");
    }
};
