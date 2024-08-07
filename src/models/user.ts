import { NftModel } from './nftModel';

export interface User {
  email: string;
  userId: string;
  userName: string;
  password: string;  // NOTE: C# is PasswordHash
  createdAt: string;
  favorites: FavoritesList[];
}

export interface FavoritesList {
  listId: string;
  listName: string;
  favorites: NftModel[];
}