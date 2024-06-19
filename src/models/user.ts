import { Nft } from '../models/nft';

export interface User {
  email: string;
  id: string;
  userName: string;
  password: string;  // NOTE: C# is PasswordHash
  createdAt: string;
  favorites: FavoritesList[];
}

export interface FavoritesList {
  listId: string;
  listName: string;
  favorites: Nft[];
}