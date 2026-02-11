
import { View, Text, Image, TouchableOpacity } from "react-native";

type InstructorCardProps = {
    instructor: any;
};

export default function InstructorCard({ instructor }: InstructorCardProps) {
    return (
        <TouchableOpacity className="bg-white rounded-xl p-4 mb-4 shadow-sm flex-row">

            {/* Profile Image */}
            <Image
                source={{ uri: instructor.picture.medium }}
                className="w-16 h-16 rounded-full"
            />

            {/* Info */}
            <View className="flex-1 ml-4">
                <Text className="text-base font-bold text-gray-900">
                    {instructor.name.first} {instructor.name.last}
                </Text>

                <Text className="text-sm text-gray-500">
                    {instructor.location.country}
                </Text>

                <Text className="text-sm text-gray-600 mt-1">
                    {instructor.email}
                </Text>

                <View className="flex-row mt-2 space-x-4">
                    <Text className="text-xs text-gray-400">
                        {instructor.registered.age}+ yrs exp
                    </Text>

                    <Text className="text-xs text-gray-400">
                        Age {instructor.dob.age}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
