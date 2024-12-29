/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttemptDto } from "../dto/stempt.dto";
import { AttemptSliceType } from "../type/ateptSlice.type";
import { createAttemptApi, fetchAttemptsApi } from "../../utils/api";
const initialState: AttemptSliceType = {
  attempts: [],
};

import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAttempt = createAsyncThunk(
  "attempt/createAttempt",
  async (attempt: AttemptDto) => {
    try {
      const data = await createAttemptApi("/attempts", attempt);
      return data;
    } catch (error) {
      console.warn(error);
      return { error: "Failed to create attempt" } as const;
    }
  }
);

export const fetchAttempts = createAsyncThunk("attempt/fetchAttempts", async () => {
  try {
    const data = await fetchAttemptsApi("/attempts");
    return data;
  } catch (error) {
    console.warn(error);
    return { error: "Failed to fetch attempts" } as const;
  }
});

const attemptSlice = createSlice({
  name: "attempt",
  initialState,
  reducers: {
    addAttempt: (state, action: PayloadAction<AttemptDto>) => {
      state.attempts.push(action.payload);
    },
    clearAttempts: (state) => {
      state.attempts = [];
    },
  },
});

export const { addAttempt, clearAttempts } = attemptSlice.actions;
export default attemptSlice.reducer;
