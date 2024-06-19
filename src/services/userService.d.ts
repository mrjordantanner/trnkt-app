import { User } from '../models/user'

declare class UserService {
  private baseUrl: string;
  fetchNft(email: string | null): Promise<User | null>;
}

export default UserService;
