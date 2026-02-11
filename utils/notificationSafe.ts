
import Constants from "expo-constants";
import { Platform } from "react-native";

export const isExpoGo = Constants.appOwnership === "expo";

export const canUseNotifications = Platform.OS !== "web";
