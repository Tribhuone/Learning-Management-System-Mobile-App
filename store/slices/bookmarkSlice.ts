
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notifyBookmarks } from "@/utils/notifications";

type Course = {
    id: number;
    title: string;
    thumbnail: string;
};

type BookmarkState = {
    items: Course[];
};

const initialState = {
    items: []
} as BookmarkState;

const bookmarkSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        toggleBookmark: (state, action: PayloadAction<Course>) => {
            const exists = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (exists) {
                // if already exist than remove
                state.items = state.items.filter(
                    (item) => item.id !== action.payload.id
                );

            } else {
                // either add
                state.items.push(action.payload);

                if (state.items.length === 5) {
                    notifyBookmarks(state.items.length);
                }
            }
        },
    },
});

export const { toggleBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;