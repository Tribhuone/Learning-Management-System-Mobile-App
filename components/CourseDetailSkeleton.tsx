import { View } from "react-native";

export default function CourseDetailSkeleton() {
    return (
        <View className="p-4">
            <View className="h-56 bg-gray-300 rounded-lg mb-4" />

            <View className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
            <View className="h-4 bg-gray-300 rounded w-1/2 mb-4" />

            <View className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
            <View className="h-4 bg-gray-300 rounded w-full mb-1" />
            <View className="h-4 bg-gray-300 rounded w-5/6 mb-6" />

            <View className="h-12 bg-gray-300 rounded" />
        </View>
    );
}
