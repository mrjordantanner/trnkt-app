import axios from 'axios';
import { FavoritesList, UserFavorites } from '../models/favorites';

class FavoritesService {
  private baseUrl: string;
  // getRequestOptions: RequestInit = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //   }
  // };

  constructor() {
    this.baseUrl = 'http://127.0.0.1:5000/api/favorites';
  }

  // getFavoritesFetch = async (userId: string | null): Promise<UserFavorites | null> => {
  //   if (!userId) {
  //     console.error("Couldn't get user favorites -- UserId was null");
  //     return null;
  //   }
  //   try {
  //     console.log(`Fetching User Favorites...`);
  //     const response = await fetch(`${this.baseUrl}/${userId}`, this.getRequestOptions);
  //     const users = await response.json();
  //     console.log(users);
  //     return users;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.resolve(null);
  //   }
  // }

  getFavorites = async (userId: string): Promise<UserFavorites | null> => {
	if (!userId) {
		console.error("Couldn't get user favorites -- UserId was null");
		return null;
	}
    try {
      const response = await axios.get(`${this.baseUrl}/${userId}`);
      console.log('Get Favorites:');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return Promise.resolve(null);
    }
  }

  // updateFavoritesFetch = async (userId: string, favoritesLists: FavoritesList[]) : Promise<UserFavorites | null> => {
  //   // const token = this.getToken();
  //   // if (!token) {
  //   //   throw new Error('No JWT token found');
  //   // }
  //   const options: RequestInit = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       //'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify(favoritesLists)
  //   };

  //   console.log('UPDATE FAVES:');
  //   console.log(favoritesLists);

  //   const url = `${this.baseUrl}/${userId}`;
  //   try {
  //     console.log(`Updating Favorites for UserId ${userId}...`);
  //     const response = await fetch(url, options);
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Failed to update User Favorites: ${response.status} ${errorText}`);
  //     }

  //     // Update Favorites STEP 7
  //     const updatedUserFavorites: UserFavorites = await response.json();
  //     console.log("POST-UPDATE FAVES:")
  //     console.log(updatedUserFavorites);
  //     return updatedUserFavorites;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // }


  updateFavorites = async (userId: string, favoritesLists: FavoritesList[]): Promise<UserFavorites | null> => {
    // Update Favorites STEP 3 

    console.log('--TEST--');
    favoritesLists.forEach((list) => {
      if (list.nfts.length > 0) {
        list.nfts.forEach((nft) => {
          console.log(nft);
          // console.log(`Nft: ${nft.name} / ImgUrl: ${nft.image_url} / AnimationUrl: ${nft.animation_url}`);
        })
      }
    });

    // ---- favorites are valid up to here ---

    try {
      // TODO this will need to use a JWT at some point
      console.log(`Updating Favorites for UserId ${userId}...`);
      const response = await axios.post(`${this.baseUrl}/${userId}`, favoritesLists);
      console.log('UpdateFavorites Response Data:');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating favorites:', error);
      throw error;
    }
  }

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
