/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/slices/userSlice";
import attemptSlice from "./redux/slices/stemptSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    attempts: attemptSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
