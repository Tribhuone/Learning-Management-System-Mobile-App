import {
    View,
    FlatList,
    Text,
    TextInput,
    RefreshControl,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";

import { useEffect, useState, useCallback, useMemo } from "react";
import api from "../../services/api";
import CourseCard from "../../components/CourseCard";
import CourseCardSkeleton from "../../components/CourseCardSkeleton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { toggleBookmark } from "@/store/slices/bookmarkSlice";
import { RootState } from "@/store/store";
import InstructorCard from "@/components/InstructorCard";

export default function Courses() {
    const [courses, setCourses] = useState<any[]>([]);
    const [instructors, setInstructors] = useState<any[]>([]);
    const [instructorList, setInstructorList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [activeTab, setActiveTab] = useState("courses");

    const router = useRouter();
    const dispatch = useDispatch();

    const bookmarks = useSelector(
        (state: RootState) => state.bookmarks.items
    );

    // ---------------- LOADERS ----------------

    const loadCourses = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get("/public/randomproducts");
            setCourses(res.data.data.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
            setRefresh(false);
        }
    }, []);

    const loadInstructorList = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get("/public/randomusers");

            const names = res.data.data.data.map(
                (u: any) => `${u.name.first} ${u.name.last}`
            );
            setInstructors(names);
            setInstructorList(res.data.data.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCourses();
        loadInstructorList();
    }, []);

    // ---------------- SEARCH ----------------

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const filteredCourses = useMemo(() => {
        if (!debouncedSearch.trim()) return courses;
        return courses.filter((c) =>
            c.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [debouncedSearch, courses]);

    const pullRefresh = useCallback(() => {
        setRefresh(true);
        loadCourses();
    }, []);

    // ---------------- UI ----------------

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <Text className="text-2xl font-bold text-gray-900 my-2">
                Learn New Way
            </Text>

            {/* TABS */}
            <View style={{ alignItems: "flex-start" }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: "row",
                        gap: 8,
                        paddingVertical: 6,
                        alignItems: "center",
                    }}
                    className="mb-4"
                >
                    {["courses", "bookmarks", "instructors"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`px-5 h-[2rem] rounded-full border border-gray-300
                    justify-center items-center
                    ${activeTab === tab ? "bg-cyan-600/30" : "bg-transparent"}`}
                        >
                            <Text className="text-gray-700 font-medium capitalize">
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={{ flex: 1 }} >
                {/* COURSES */}
                {activeTab === "courses" && (
                    <>
                        <TextInput
                            placeholder="Search"
                            value={search}
                            onChangeText={setSearch}
                            placeholderTextColor="gray"
                            className="bg-white px-3 py-2 rounded-xl mb-4 text-gray-600"
                        />

                        <FlatList
                            data={loading ? [] : filteredCourses}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <CourseCard
                                    course={item}
                                    instructors={instructors[index]}
                                />
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refresh}
                                    onRefresh={pullRefresh}
                                />
                            }
                            ListEmptyComponent={
                                loading ? (
                                    <>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <CourseCardSkeleton key={i} />
                                        ))}
                                    </>
                                ) : (
                                    <View className="flex-1 gap-3 justify-center items-center">
                                        <Text className="text-center mt-10 text-gray-500">
                                            No courses found
                                        </Text>
                                        <TouchableOpacity onPress={pullRefresh} className="bg-cyan-600/30 px-5 h-[2rem] w-[100px] rounded-full border border-gray-300 justify-center items-center">
                                            <Text className="text-black">
                                                Retry
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        />
                    </>
                )}

                {/* BOOKMARKS */}
                {activeTab === "bookmarks" && (
                    <FlatList
                        data={bookmarks}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={pullRefresh}
                            />
                        }
                        contentContainerStyle={{
                            paddingBottom: 20,
                            paddingTop: 4,                        // 🔥 list starts from top
                            alignItems: "stretch",               // 🔥 no center alignment
                        }}
                        ListEmptyComponent={
                            loading ? (
                                <>
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <CourseCardSkeleton key={i} />
                                    ))}
                                </>
                            ) : (
                                <View className="flex-1 gap-3 justify-center items-center">
                                    <Text className="text-center mt-10 text-gray-500">
                                        No bookmarks found
                                    </Text>
                                    <TouchableOpacity onPress={pullRefresh} className="bg-cyan-600/30 px-5 h-[2rem] w-[100px] rounded-full border border-gray-300 justify-center items-center">
                                        <Text className="text-black">
                                            Retry
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => router.push(`/course/${item.id}`)}
                                className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden flex-row"
                            >
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    className="w-28 h-28"
                                    resizeMode="cover"
                                />

                                <View className="flex-1 p-3">
                                    <Text
                                        numberOfLines={2}
                                        className="text-base font-bold"
                                    >
                                        {item.title}
                                    </Text>

                                    <View className="flex-row justify-between items-center mt-3">
                                        <Text className="text-xs text-gray-400">
                                            Bookmarked
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => dispatch(toggleBookmark(item))}
                                        >
                                            <Ionicons
                                                name="bookmark"
                                                size={22}
                                                color="#0891b2"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}

                {/* INSTRUCTORS */}
                {activeTab === "instructors" && (
                    <FlatList
                        data={instructorList}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <InstructorCard instructor={item} />
                        )}
                    />
                )}
            </View>
        </View>
    );
}
