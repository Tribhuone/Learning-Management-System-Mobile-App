
import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import * as Network from 'expo-network';
import { Ionicons } from '@expo/vector-icons';

export default function OfflineBanner() {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        // let subscription: Network.NetInfoSubscription | null = null;

        const checkConnection = async () => {
            const status = await Network.getNetworkStateAsync();
            setIsConnected(status.isConnected ?? true);
        };

        // Initial check
        checkConnection();

        // Subscribe to updates (Note: expo-network doesn't have a direct hook for changes like NetInfo, 
        // but often polling or just checking on specific actions is used. 
        // HOWEVER, for a real-time banner, we ideally want a listener. 
        // `expo-network` does not provide an event listener for state changes directly in older versions, 
        // but let's check if we can simulate it or if we should use `NetInfo` from react-native-community.
        // Since we are using `expo-network`, let's stick to it. 
        // Use an interval for simplicity in this demo if no listener is available, 
        // OR better, checking on focus.
        // Actually, let's just use a simple polling for this demo to be robust without extra heavy deps.
        const interval = setInterval(checkConnection, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (isConnected) return null;

    return (
        <View className="bg-red-500 py-2 px-4 flex-row items-center justify-center safe-top">
            <Ionicons name="cloud-offline" size={20} color="white" />
            <Text className="text-white ml-2 font-medium text-sm">
                No Internet Connection
            </Text>
        </View>
    );
}
