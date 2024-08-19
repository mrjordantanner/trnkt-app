import axios, { AxiosRequestConfig } from 'axios';
import { FavoritesList, UserFavorites } from '../models/favorites';

class FavoritesService {
  private apiEndpoint = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  baseUrl = `${this.apiEndpoint}/api/favorites`;
	axiosOptions: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
	};

  getFavorites = async (userId: string): Promise<UserFavorites | null> => {
    if (!userId) {
      console.error("Couldn't get user favorites -- UserId was null");
      return null;
    }
    try {
      const response = await axios.get(`${this.baseUrl}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return Promise.resolve(null);
    }
  }

  updateFavorites = async (userId: string, favoritesLists: FavoritesList[]): Promise<UserFavorites | null> => {
    // Update Favorites STEP 3 

     try {
      // TODO this will need to use a JWT at some point
      console.log(`Updating Favorites for UserId ${userId}...`);
      const response = await axios.post(`${this.baseUrl}/${userId}`, favoritesLists);
      return response.data;
    } catch (error) {
      console.error('Error updating favorites:', error);
      throw error;
    }
  }

  deleteUserFavorites = async (userId: string) : Promise<boolean> => {
    try {
      const response = await axios.delete(`${this.baseUrl}/${userId}`);
      return response.status < 300;
    } catch (error) {
      console.error('Error deleting UserFavorites:', error);
      throw error;
    }
  }

  deleteFavoritesList = async (userId: string, listId: string) : Promise<boolean> => {
    try {
      const response = await axios.delete(`${this.baseUrl}/${userId}/${listId}`);
      return response.status < 300;
    } catch (error) {
      console.error(`Error deleting FavoritesList ${listId}:`, error);
      throw error;
    }
  }

  deleteNFtFromFavoritesList = async (userId: string, listId: string, nftId: string) : Promise<boolean> => {
    try {
      const response = await axios.patch(`${this.baseUrl}/${userId}/${listId}/${nftId}`);
      return response.status < 300;
    } catch (error) {
      console.error(`Error deleting NFT ${nftId} from FavoritesList ${listId}:`, error);
      throw error;
    }
  }
}

export default FavoritesService;
