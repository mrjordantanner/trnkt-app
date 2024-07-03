import { Nft } from './nft';

export interface FavoritesList {
    //userId: string;
    listId: string;
    name: string;
    nfts: Nft[];
}

export interface UserFavorites {
    userId: string;
    favorites: FavoritesList[];
}