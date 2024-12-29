/** @format */

import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./redux/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
