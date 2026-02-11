
import { View, Text } from "react-native";
import RatingBar from "./RatingBar";

export default function RatingsSection({ rating }: { rating: number }) {

    const ratingPercent = rating * 100;

    return (
        <View className="mt-8">
            {/* Header */}
            <Text className="text-slate-800 text-lg font-semibold mb-1">
                Ratings and reviews
            </Text>

            <Text className="text-zinc-500 text-sm mb-4">
                Ratings and reviews are verified and are from people who use the same
                type of device that you use
            </Text>

            <View className="flex-row">
                {/* Left Side */}
                <View className="w-24 items-center justify-center">
                    <Text className="text-zinc-700 text-4xl font-bold">{rating.toFixed(2)}</Text>

                    <Text className="text-yellow-400 text-base mt-1">{"★".repeat(Math.round(rating))}☆</Text>

                    <Text className="text-gray-400 text-xs mt-1">100</Text>
                </View>

                {/* Right Side */}
                <View className="flex-1 ml-4">
                    <RatingBar label="5" percent={ratingPercent / 5} />
                    <RatingBar label="4" percent={(ratingPercent / 4) / rating} />
                    <RatingBar label="3" percent={(ratingPercent / 3) / rating} />
                    <RatingBar label="2" percent={(ratingPercent / 2) / rating} />
                    <RatingBar label="1" percent={(ratingPercent / 1) / rating} />
                </View>
            </View>
        </View>
    );
}
