import { User } from '../models/user'
import { UpdateUserRequestBody } from '../models/updateUserRequestBody';

declare class UserService {
  private baseUrl: string;
  registerNewUserAsync(email: string, userName: string, password: string): Promise<User | null>;
  fetchUserByEmailAsync(email: string | null): Promise<User | null>;
  fetchAllUsersAsync(email: string | null): Promise<User[] | null>;
  updateUserInfoAsync(updateUserInfo: UpdateUserRequestBody): Promise<User | null>;
  loginUserAsync(email: string, password: string): Promise<User | null>;
  logoutUserAsync(): Promise<boolean>;
}

export default UserService;
