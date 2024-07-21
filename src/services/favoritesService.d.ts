import { FavoritesList, UserFavorites } from '../models/favorites';

declare class FavoritesService {
  private baseUrl: string;
  getFavorites(userId: string): Promise<UserFavorites | null>;
  updateFavorites(userId: string, favoritesLists: FavoritesList[]): Promise<boolean>;
  deleteUserFavorites(userId: string): Promise<boolean>;
  deleteFavoritesList(userId: string, listId: string): Promise<boolean>;
}

export default FavoritesService;