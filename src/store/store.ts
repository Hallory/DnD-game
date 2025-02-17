import { configureStore } from "@reduxjs/toolkit"
import playerReducer from "./playerSlice";
import characterReducer from "./characters/characterSlice";

export const store = configureStore({
    reducer: {
        player: playerReducer,
        character: characterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;