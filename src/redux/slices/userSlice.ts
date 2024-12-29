/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserApi, fetchUsersApi } from "../../utils/api";
import { UserDto } from "../dto/user.dto";
import { userSliceType } from "../type/usersSlice.type";

const initialState: userSliceType = {
  users: [],
  isLoading: false,
  error: null,
  message: "",
};

const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const data = (await fetchUsersApi("/users")) as UserDto[];
  return data;
});

const createUser = createAsyncThunk("user/fetchUsers", async (user: UserDto) => {
  const data = (await createUserApi("/users", user)) as UserDto;
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserDto[]>) => {
        state.isLoading = false;
        state.users = action.payload;
      });
  },
});

export { fetchUsers, createUser };
export default userSlice.reducer;
