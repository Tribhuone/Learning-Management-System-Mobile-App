import './global.css';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";

import { useEffect, useState } from "react";
import { bootstrapAuth } from "@/utils/bootstrapAuth";
import OfflineBanner from '@/components/OfflineBanner';

import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { requestNotificationPermissionOnce } from "@/utils/notificationPermission";
import { schedule24HourReminder, cancel24HourReminder } from "@/utils/notifications";
import * as Notifications from 'expo-notifications';

// ✅ Allow notifications to show even when the app is open
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

function AppInitializer() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            // 1. Bootstrap Auth (Verify Token)
            await bootstrapAuth(dispatch);

            // 2. Notifications Setup
            await requestNotificationPermissionOnce();
            await cancel24HourReminder();
            await schedule24HourReminder();

            setIsReady(true);
        };
        init();
    }, []);

    useEffect(() => {
        if (!isReady) return;

        // 2. Navigation Logic
        if (isAuthenticated) {
            // Check if we are already in the app, if not, go to tabs
            // Actually, replace is safer to clear history
            router.replace("/(tabs)");
        } else {
            router.replace("/auth/login");
        }
    }, [isAuthenticated, isReady]);

    // Show a splash screen or nothing while initializing
    if (!isReady) return null;

    return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top"]} >
            <StatusBar style="dark" />

            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <OfflineBanner />
                    <AppInitializer />
                </PersistGate>
            </Provider>
        </SafeAreaView>
    );
}
