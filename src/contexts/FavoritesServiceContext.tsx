import React, { createContext, useContext, useState, ReactNode } from 'react';
import FavoritesService from '../services/favoritesService';
import { FavoritesList, UserFavorites } from '../models/favorites';
import { v4 as uuidv4 } from 'uuid';
import { useUserService } from '../contexts/UserServiceContext';

interface ContextProps {
    getUserFavorites: (userId: string) => Promise<UserFavorites | null>;
    updateFavorites: (userId: string, updatedLists: FavoritesList[]) => Promise<UserFavorites | null>;
    userFavorites: UserFavorites | null;
    favoritesLists: FavoritesList[];
    setFavoritesLists: React.Dispatch<FavoritesList[]>;
    createNewFavoritesList: (newListName: string) => Promise<UserFavorites | null> 
    deleteNftFromFavoritesList: (userId: string, listId: string, nftId: string) => Promise<boolean>;
    deleteFavoritesList: (listId: string) => Promise<boolean>;
    deleteUserFavorites: (userId: string) => Promise<boolean>;
}

const FavoritesServiceContext = createContext<ContextProps | undefined>(undefined);

export const FavoritesServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const defaultFavorites: FavoritesList[] = [
		{
			listId: 'Default-Favorites',
			name: 'Default Favorites',
			nfts: [],
		},
	];

    const favoritesService = new FavoritesService();
    const { currentUser } = useUserService();
    const [userFavorites, setUserFavorites] = useState<UserFavorites | null>(null);
    const [favoritesLists, setFavoritesLists] = useState<FavoritesList[]>(defaultFavorites);

    const getUserFavorites = async (userId: string) : Promise<UserFavorites | null> => {
        const userFavorites = await favoritesService.getFavorites(userId);
        if (userFavorites) {
            setUserFavorites(userFavorites);
        }
        return userFavorites;
    };

    // TODO tighten up and better define the relationship/logic flow between 
    // 1) local Favorites cached in browser memory, 
    // 2) the cache of Favorites in the server, and 
    // 3) Favorites saved in the DB
    const createNewFavoritesList = async (newListName: string | '') : Promise<UserFavorites | null> => {
        if (newListName == '') {
            const listNumber = userFavorites?.favorites?.length;
            newListName = `New List ${listNumber ? listNumber + 1 : 1}`
        }
        const newList: FavoritesList = {
            listId: uuidv4(),
            name: newListName,
            nfts: [],
        }; 
        const newFavoritesLists = favoritesLists
            ? [...favoritesLists, newList]
            : [newList];
        setFavoritesLists(newFavoritesLists);

        let updatedFavorites;
        try {
            if (!currentUser) {
                console.error('Error creating new Favorites List. Local CurrentUser was null.');
                return null;
            }
            updatedFavorites = await updateFavorites(currentUser.userId, favoritesLists);
        }
        catch (ex) {
            console.error('Error creating new Favorites List:', ex);
            return null;
        }
        console.log(`Total Favorites: ${updatedFavorites?.favorites.length}`);
        return updatedFavorites;
    }

    // Update Favorites STEP 2
    const updateFavorites = async (userId: string, updatedLists: FavoritesList[]) : Promise<UserFavorites | null> => {
        const updatedFavorites = await favoritesService.updateFavorites(userId, updatedLists);

        // Update Favorites STEP 8
        if (updatedFavorites) { 
            setUserFavorites(updatedFavorites);
        }
        return updatedFavorites;
        //return userFavorites;
    }

    const deleteNftFromFavoritesList = async (userId: string, listId: string, nftId: string) : Promise<boolean> => {
        const updatedUserFavorites = await favoritesService.deleteNFtFromFavoritesList(userId, listId, nftId);
        if (updatedUserFavorites) {
            return updatedUserFavorites;
        } else {
            console.error(`Error deleting NFT ${nftId} from FavoritesList ${listId}`)
            return false;
        }
    }

    const deleteFavoritesList = async (listIdToDelete: string) : Promise<boolean> => {
		if (!currentUser) {
			console.error(`Error deleting FavoritesList ${listIdToDelete}. CurrentUser is null.`);
			return false;
		}
		const success = await favoritesService.deleteFavoritesList(currentUser.userId, listIdToDelete);
		if (success) {
			const filteredLists = favoritesLists.filter((list) => list.listId !== listIdToDelete);
			setFavoritesLists(filteredLists);
		}
        return success;
    };

    // const deleteFavoritesList = async (userId: string, listId: string) : Promise<boolean> => {
    //     return await favoritesService.deleteFavoritesList(userId, listId);
    // }

    const deleteUserFavorites = async (userId: string) : Promise<boolean> => {
        const wasSuccessful = await favoritesService.deleteUserFavorites(userId);
        if (!wasSuccessful) {
            console.error(`Error deleting UserFavorites for UserId ${userId}`);
            return false;
        }
        console.log(`Successfully deleted UserFavorites for UserId ${userId}`);
        return true;
    }

    return (
        <FavoritesServiceContext.Provider 
            value={{ 
                getUserFavorites,
                userFavorites,
                updateFavorites,
                deleteNftFromFavoritesList,
                deleteFavoritesList,
                deleteUserFavorites,
                favoritesLists,
                setFavoritesLists,
                createNewFavoritesList
             }}>
            {children}
        </FavoritesServiceContext.Provider>
    );
};

export function useFavoritesContext(): ContextProps {
    const context = useContext(FavoritesServiceContext);
    if (!context) {
        throw new Error('useFavoritesService must be used within a FavoritesServiceProvider');
    }
    return context;
}