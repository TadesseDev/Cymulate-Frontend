/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserApi, loginUserApi } from "../../utils/api";
import { UserDto } from "../dto/user.dto";
import { userSliceType } from "../type/usersSlice.type";

const initialState: userSliceType = {
  user: null,
  isLoading: false,
  error: null,
  message: "",
};

// const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
//   const data = (await fetchUsersApi("/users")) as UserDto[];
//   return data;
// });

const createUser = createAsyncThunk("user/signup", async (user: UserDto) => {
  try {
    const data = (await createUserApi("/users", user)) as UserDto;
    return data;
  } catch (error) {
    console.warn(error);
    return { error: "Failed to create user" } as const;
  }
});

const loginUser = createAsyncThunk(
  "user/login",
  async ({
    email,
    password,
    redirectOnSuccess,
  }: {
    email: string;
    password: string;
    redirectOnSuccess: () => void;
  }) => {
    const data = (await loginUserApi("/auth/login", { email, password })) as UserDto;
    localStorage.setItem("access_token", data.access_token || "");
    redirectOnSuccess();
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      });
    // .addCase(loginUser.rejected, (state, action: PayloadAction<string>) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export { createUser, loginUser };
export default userSlice.reducer;
