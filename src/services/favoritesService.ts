import axios from 'axios';
import { FavoritesList, UserFavorites } from '../models/favorites';

class FavoritesService {
  private baseUrl: string;
  getRequestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  constructor() {
    this.baseUrl = 'http://127.0.0.1:5000/api/favorites';
  }

  getFavorites = async (userId: string | null): Promise<UserFavorites | null> => {
    if (!userId) {
      console.error("Couldn't get user favorites -- UserId was null");
      return null;
    }
    try {
      console.log(`Fetching User Favorites...`);
      const response = await fetch(`${this.baseUrl}/${userId}`, this.getRequestOptions);
      const users = await response.json();
      console.log(users);
      return users;
    } catch (error) {
      console.error(error);
      return Promise.resolve(null);
    }
  }

  // getFavorites = async (userId: string): Promise<UserFavorites | null> => {
	// if (!userId) {
	// 	console.error("Couldn't get user favorites -- UserId was null");
	// 	return null;
	// }
  //   try {
  //     const response = await axios.get(`${this.baseUrl}/${userId}`);
  //     console.log('Get Favorites:');
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching favorites:', error);
  //     throw error;
  //   }
  // }

  updateFavorites = async (userId: string, favoritesLists: FavoritesList[]) : Promise<UserFavorites | null> => {
    // const token = this.getToken();
    // if (!token) {
    //   throw new Error('No JWT token found');
    // }
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(favoritesLists)
    };

    const url = `${this.baseUrl}/${userId}`;
    try {
      console.log(`Updating Favorites for UserId ${userId}...`);
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update User Favorites: ${response.status} ${errorText}`);
      }
      const updatedUserFavorites: UserFavorites = await response.json();
      //console.log(updatedUserFavorites);
      return updatedUserFavorites;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // updateFavorites = async (userId: string, favoritesLists: FavoritesList[]) => {
  //   try {
  //     const response = await axios.patch(`${this.baseUrl}/${userId}`, favoritesLists);
  //     console.log('Update Favorites:');
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error updating favorites:', error);
  //     throw error;
  //   }
  // }

  deleteFavorites = async (userId: string) => {
    try {
      const response = await axios.delete(`${this.baseUrl}/${userId}`);
      console.log('Delete Favorites:');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting favorites:', error);
      throw error;
    }
  }
}

export default FavoritesService;
