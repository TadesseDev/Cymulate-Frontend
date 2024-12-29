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
    return { error: "Failed to create user" } as const;
  }
});

const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    const data = (await loginUserApi("/auth/login", { email, password })) as UserDto;
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
        localStorage.setItem("access_token", action.payload.access_token || "");
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
