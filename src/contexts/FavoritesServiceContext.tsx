import React, { createContext, useContext, useState, ReactNode } from 'react';
import FavoritesService from '../services/favoritesService';
import { FavoritesList, UserFavorites } from '../models/favorites';

interface ContextProps {
    getUserFavorites: (userId: string) => Promise<UserFavorites | null>;
    updateFavorites: (userId: string, updatedLists: FavoritesList[]) => Promise<UserFavorites | null>;
    userFavorites: UserFavorites | null;
    //setUserFavorites: React.Dispatch<UserFavorites | null>;
    deleteFavoritesList: (userId: string, listId: string) => Promise<UserFavorites | null>;
    deleteUserFavorites: (userId: string) => Promise<boolean>;
}

const FavoritesServiceContext = createContext<ContextProps | undefined>(undefined);


export const FavoritesServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const favoritesService = new FavoritesService();
    const [userFavorites, setUserFavorites] = useState<UserFavorites | null>(null);

    const getUserFavorites = async (userId: string) : Promise<UserFavorites | null> => {
        const userFavorites = await favoritesService.getFavorites(userId);
        if (userFavorites) {
            setUserFavorites(userFavorites);
        }
        return userFavorites;
    };

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

    const deleteFavoritesList = async (userId: string, listId: string) : Promise<UserFavorites | null> => {
        const updatedUserFavorites = await favoritesService.deleteFavoritesList(userId, listId);
        if (updatedUserFavorites) {
            return updatedUserFavorites;
        } else {
            console.error(`Error deleting FavoritesList ${listId}`)
            return null;
        }
    }

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
                deleteFavoritesList,
                deleteUserFavorites
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