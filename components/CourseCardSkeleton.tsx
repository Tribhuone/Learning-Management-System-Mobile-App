import { View } from "react-native";

export default function CourseCardSkeleton() {
    return (
        <View className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden flex-row animate-pulse">

            {/* Thumbnail Skeleton */}
            <View className="w-28 h-28 bg-gray-300" />

            {/* Content Skeleton */}
            <View className="flex-1 p-3">

                {/* Title */}
                <View className="h-4 bg-gray-300 rounded w-3/4 mb-2" />

                {/* Brand */}
                <View className="h-3 bg-gray-200 rounded w-1/3 mb-2" />

                {/* Description lines */}
                <View className="h-3 bg-gray-300 rounded w-full mb-1" />
                <View className="h-3 bg-gray-300 rounded w-5/6 mb-2" />

                {/* Footer */}
                <View className="flex-row justify-between items-center mt-2">
                    <View className="h-3 bg-gray-200 rounded w-12" />
                    <View className="h-5 w-5 bg-gray-300 rounded-full" />
                </View>
            </View>
        </View>
    );
}
