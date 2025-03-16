import { createSlice } from "@reduxjs/toolkit";

const newQuesSlice = createSlice({
    name: "newQuestion",
    initialState: null,
    reducers: {
        createQuestion: (state, action) => {
            return action.payload;
        },
        removeUser: () => {
            return null;
        },
    },
});

export const { addUser, removeUser } = newQuesSlice.actions;

export default newQuesSlice.reducer;