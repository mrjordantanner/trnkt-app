import { Nft } from './nft';

export interface FavoritesList {
    listId: string;
    name: string;
    nfts: Nft[];
}

export interface UserFavorites {
    userId: string;
    favorites: FavoritesList[];
}