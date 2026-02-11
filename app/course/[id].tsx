import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import api from "../../services/api";
import CourseDetailSkeleton from "../../components/CourseDetailSkeleton";
import CourseImage from "../../components/CourseImage";
import RatingSection from "../../components/RatingSection";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../../store/slices/bookmarkSlice";
import { RootState } from "../../store/store";

type course = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

export default function CourseDetail() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const dispatch = useDispatch();

    const isBookmarked = useSelector((state: RootState) =>
        state.bookmarks.items.every((item: any) => item.id === course?.id)
    );

    const [course, setcourse] = useState<course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // course data fetching function...
    const fetchcourse = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/public/randomproducts/${id}`);
            setcourse(res.data.data);
        } catch {
            setError("Unable to load Course details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchcourse();
    }, []);

    if (loading) return <CourseDetailSkeleton />;

    if (error)
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="mb-3 text-lg text-red-600">{error}</Text>
                <TouchableOpacity
                    onPress={fetchcourse}
                    className="px-5 py-2 text-white bg-gray-400/80 rounded-xl"
                >
                    <Text className="text-white">Retry</Text>
                </TouchableOpacity>
            </View>
        );

    if (!course) return null;

    // bookmark function...
    const handleBookmark = () => {
        dispatch(
            toggleBookmark({
                id: course.id,
                title: course.title,
                thumbnail: course.thumbnail,
            })
        );
    };


    const discountedPrice = Math.round(
        course.price - (course.price * course.discountPercentage) / 100
    );

    return (
        <ScrollView className="p-4">

            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="absolute -top-2 -left-2 z-10 bg-gray-100/80 p-2 rounded-full"
            >
                <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>

            {/* Images */}
            <CourseImage images={course.images} />

            {/* Title */}
            <Text className="text-2xl font-bold mt-4">
                {course.title}
            </Text>

            {/* Brand + Category */}
            <Text className="text-gray-500 mt-1">
                {course.brand} • {course.category}
            </Text>

            {/* Rating & Stock */}
            <View className="flex-row mt-2">
                {/* <Text className="mr-4">⭐ {course.rating}</Text> */}
                <Text className="text-cyan-700">
                    {course.stock} in stock
                </Text>
            </View>

            {/* Price */}
            <View className="flex-row items-center mt-3">
                <Text className="text-2xl font-bold mr-3">
                    ${discountedPrice}
                </Text>
                <Text className="line-through text-gray-400">
                    ${course.price}
                </Text>
                <Text className="ml-2 text-stone-600">
                    {course.discountPercentage}% OFF
                </Text>
            </View>

            {/* Description */}
            <Text className="mt-4 text-base leading-6">
                {course.description}
            </Text>

            <RatingSection rating={course.rating} />

            {/* CTA */}

            <View className="flex-row justify-between gap-1 items-center">

                <TouchableOpacity
                    className="bg-cyan-600 p-4 rounded-lg mt-6 w-[80%]"
                >
                    <Text className="text-white text-center font-semibold">
                        Enroll Now
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="p-3 rounded-lg mt-6 items-center justify-center"
                    onPress={handleBookmark}
                >
                    <Text>
                        <FontAwesome
                            name={isBookmarked ? "bookmark" : "bookmark-o"}
                            size={30}
                            color="#10708aff"
                            className="bg-gray-100/80 p-2 rounded-full"
                        />
                        {/* {
                            isBookmarked ?
                                <FontAwesome name="bookmark-o" size={30} color="#10708aff" />
                                : <MaterialIcons name="bookmark" size={30} color="#347783ff" />
                        } */}

                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
