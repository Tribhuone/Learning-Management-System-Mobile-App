import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./slices/bookmarkSlice";
import authReducer from "./slices/authSlice";

import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["bookmarks", "auth"], // 👈 persist both bookmarks and auth
};

const rootReducer = combineReducers({
    bookmarks: bookmarkReducer,
    auth: authReducer,   // 👈 REQUIRED
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
