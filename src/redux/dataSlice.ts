/** @format */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Cat, DataState } from "./type/dataSlice";
import { createCatApi, fetchCats } from "../utils/api";

const initialState: DataState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const data = await fetchCats("/cat");
  return await data;
});

export const createCat = createAsyncThunk("data/createCat", async (cat: Cat) => {
  const data = await createCatApi("/cat", cat);
  return await data;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Cat[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch data";
      });

    builder
      .addCase(createCat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCat.fulfilled, (state, action: PayloadAction<Cat>) => {
        state.status = "succeeded";
        state.items = [...state.items, action.payload];
      })
      .addCase(createCat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create cat";
      });
  },
});

export default dataSlice.reducer;
