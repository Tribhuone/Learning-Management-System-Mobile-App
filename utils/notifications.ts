
import { canUseNotifications } from "./notificationSafe";

const REMINDER_ID = "24_HOUR_REMINDER";

export const notifyBookmarks = async (count: number) => {
    if (!canUseNotifications) return;

    const Notifications = await import("expo-notifications");

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Congratulations!",
            body: `You have bookmarked ${count} courses!`,
        },
        trigger: {
            type: "immediate",
        },
    });
};

export const schedule24HourReminder = async () => {
    if (!canUseNotifications) return;

    const Notifications = await import("expo-notifications");

    await Notifications.scheduleNotificationAsync({
        identifier: REMINDER_ID,
        content: {
            title: "Hey!",
            body: "Come back and continue learning!",
        },
        trigger: {
            type: "timeInterval",
            seconds: 60 * 60 * 24,
            repeats: false,
        },
    });
};

export const cancel24HourReminder = async () => {
    if (!canUseNotifications) return;

    const Notifications = await import("expo-notifications");
    await Notifications.cancelScheduledNotificationAsync(REMINDER_ID);
};
