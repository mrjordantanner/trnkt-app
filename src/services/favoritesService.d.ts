import { FavoritesList, UserFavorites } from '../models/favorites';

declare class FavoritesService {
  private baseUrl: string;
  getFavorites(userId: string): Promise<UserFavorites | null>;
  updateFavorites(userId: string, favoritesLists: FavoritesList[]): Promise<boolean>;
  deleteFavorites(userId: string): Promise<boolean>;
}

export default FavoritesService;