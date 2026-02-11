import React, { useRef, useState } from "react";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getCourseContent } from "@/assets/course_template";
import { Ionicons } from "@expo/vector-icons";

export default function WebviewScreen() {
  const { id } = useLocalSearchParams();
  const webViewRef = useRef<WebView>(null);
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [hasError, setHasError] = useState(false);

  // Generate HTML content
  const htmlContent = getCourseContent(
    `Course Module ${id}`,
    "Welcome to this course module. This content is rendered safely inside a WebView with native communication."
  );

  // Script to inject session data into the WebView
  const injectedData = `
        window.postMessage(JSON.stringify({
            type: "SESSION_DATA",
            payload: {
                username: "${user?.username || 'Guest'}",
                token: "${token || ''}"
            }
        }), "*");
        true; // true is required for Android
    `;

  const handleRetry = () => {
    setHasError(false);
    webViewRef.current?.reload();
  };

  if (hasError) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-6">
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text className="text-xl font-bold text-gray-800 mt-4 text-center">Failed to Load Content</Text>
        <Text className="text-gray-500 text-center mt-2 mb-6">
          We couldn't load the course material. Please check your connection and try again.
        </Text>
        <TouchableOpacity
          onPress={handleRetry}
          className="bg-blue-600 px-6 py-3 rounded-xl flex-row items-center"
        >
          <Ionicons name="refresh" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <WebView
        ref={webViewRef}
        source={{
          html: htmlContent,
          headers: {
            "Authorization": `Bearer ${token}`,
            "X-App-Version": "1.0.0"
          }
        }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#1182a4ff" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
        onError={() => setHasError(true)}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn(
            'WebView received error status code: ',
            nativeEvent.statusCode
          );
          setHasError(true);
        }}
        onLoadEnd={() => {
          // Inject data once loaded
          webViewRef.current?.injectJavaScript(injectedData);
        }}
      />
    </View>
  );
}
