import { NftModel } from './nftModel';

export interface FavoritesList {
    listId: string;
    name: string;
    nfts: NftModel[];
}

export interface UserFavorites {
    userId: string;
    favorites: FavoritesList[];
}