
import { View, Text } from "react-native";

export default function RatingBar({ label, percent }: { label: string; percent: number }) {

    return (
        <View className="flex-row items-center mb-2">
            <Text className="text-gray-400 w-4">{label}</Text>

            <View className="flex-1 h-2 bg-gray-700 rounded-full mx-2 overflow-hidden">
                <View
                    className="h-full bg-blue-400"
                    style={{ width: `${percent}%` }}
                />
            </View>
        </View>
    );
}
