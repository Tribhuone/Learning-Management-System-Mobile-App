
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from "expo-router";
import { useDispatch } from "react-redux";
import { toggleBookmark } from "@/store/slices/bookmarkSlice";
import { useState } from "react";

type CourseCardProps = {
    course: any;
    instructors: any;
};

export default function CourseCard({ course, instructors }: CourseCardProps) {

    const dispatch = useDispatch();

    // bookmark function...
    const handleBookmark = () => {
        dispatch(
            toggleBookmark({
                id: course.id,
                title: course.title,
                thumbnail: course.thumbnail,
            })
        );
        // Alert.alert("Bookmark", booked ? "Removed from bookmarks" : "Added to bookmarks");
    };

    return (
        <Link href={`/course/${course.id}`} asChild>
            <TouchableOpacity className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden flex-row">

                {/* Thumbnail */}
                <Image
                    source={{ uri: course.thumbnail }}
                    alt={"device"}
                    className="w-28 h-28"
                    resizeMode="cover"
                />

                {/* Content */}
                <View className="flex-1 p-3">
                    <Text numberOfLines={1} className="text-base font-bold text-black">
                        {course.title}
                    </Text>

                    <Text className="text-sm text-gray-400 mt-1">
                        {instructors}
                    </Text>

                    <Text numberOfLines={2} className="text-sm text-gray-800 mt-1">
                        {course.description}
                    </Text>

                    <View
                        className="flex-row justify-between items-center mt-2"
                    >
                        <Text className="text-xs text-gray-400">
                            ⭐ {course.rating}
                        </Text>

                        <TouchableOpacity
                            onPress={handleBookmark}
                            activeOpacity={0.7}
                        >
                            <FontAwesome
                                // name={booked ? "bookmark" : "bookmark-plus"}
                                name="bookmark-o"
                                size={18}
                                color="#16a34a"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}
