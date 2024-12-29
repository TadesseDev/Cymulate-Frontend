import { UserDto } from "../dto/user.dto";

export interface userSliceType {
  users: UserDto[];
  isLoading: boolean;
  error: string | null;
  message: string;
}
