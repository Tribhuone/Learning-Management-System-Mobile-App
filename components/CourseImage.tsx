
import { FlatList, Image, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function CourseImage({ images }: { images: string[] }) {
    return (
        <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <Image
                    source={{ uri: item }}
                    style={{ width: width - 32, height: 220 }}
                    className="rounded-lg mr-3"
                    resizeMode="contain"
                />
            )}
            className="border border-gray-200 rounded-lg bg-white"
        />
    );
}
