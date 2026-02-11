
# 📚 Learning Management System (Mobile App)

A mobile-based Learning Management System built using **React Native (Expo)**.  
This app allows users to browse courses, manage learning content, and interact with educational resources.

---

## Setup Instructions


### 1️⃣ Clone the repository

```bash
git clone https://github.com/Tribhuone/Learning-Management-System-Mobile-App.git
cd lms-app
npm install
npx expo prebuild
```
### 2️⃣ ENV Variables
Create a .env file in the root directory:
```bash
EXPO_PUBLIC_API_URL=https://api.freeapi.app/api/v1
```

### 3️⃣ Run the app
```bash
npx expo run:android
```
### 4️⃣ Key Architectural Decisions

✅ React Native + Expo
Chosen for faster development & easier setup.

✅ Redux Toolkit
Used for global state management.

✅ Expo Router
Used for navigation & routing.

✅ Secure Storage
expo-secure-store for storing authentication tokens.

✅ Modular Folder Structure

### 5️⃣ Features

✅ Course Catalog
View available courses with details.

✅ Course Enrollment
Enroll in courses to access learning materials.

✅ Progress Tracking
Track your progress through courses.

✅ User Profile
View and manage your profile information.

### 6️⃣ Technologies Used

✅ React Native + Expo
Chosen for faster development & easier setup.

✅ Redux Toolkit
Used for global state management.

✅ Expo Router
Used for navigation & routing.

✅  EXPO TOOLS (expo-notifications , expo-image-picker)
Used for notifications & image picker.

✅ Secure Storage
expo-secure-store for storing authentication tokens.

✅ Modular Folder Structure
/app
/components
/store
/services
/assets

### 7️⃣ Known Issues & Limitations

• No offline support yet
• UI optimizations pending
• Error handling can be improved
• Backend dependency required

---

## 📦 Development Build (APK)

A **development build APK** is provided for testing purposes.

### 🔽 Download APK
👉 **[Download Development APK](https://your-apk-link-here.apk)**

> ⚠ This is a development build, not a production release.  
> Performance and logs are enabled for debugging.

---

## 🛠 Build Instructions (Generate APK)

### Prerequisites

- Node.js (v18 or above)
- Expo CLI
- Android Studio (for emulator) OR physical Android device
- EAS CLI

Install EAS CLI globally:

```bash
npm install -g eas-cli

