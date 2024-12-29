/** @format */

import { UserDto } from "../dto/user.dto";

export interface userSliceType {
  user: UserDto | null;
  isLoading: boolean;
  error: string | null;
  message: string;
}
