import { NftDto } from './nftModel';

export interface FavoritesList {
    listId: string;
    name: string;
    nfts: NftDto[];
}

export interface UserFavorites {
    userId: string;
    favorites: FavoritesList[];
}