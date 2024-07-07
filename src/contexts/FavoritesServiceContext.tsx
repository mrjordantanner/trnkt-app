import React, { createContext, useContext, useState, ReactNode } from 'react';
import FavoritesService from '../services/favoritesService';
import { FavoritesList, UserFavorites } from '../models/favorites';

interface ContextProps {
    getUserFavorites: (userId: string) => Promise<UserFavorites | null>;
    updateFavorites: (userId: string, updatedLists: FavoritesList[] ) => Promise<UserFavorites | null>;
    userFavorites: UserFavorites | null;
    //setUserFavorites: React.Dispatch<UserFavorites | null>;
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

    return (
        <FavoritesServiceContext.Provider 
            value={{ 
                getUserFavorites,
                userFavorites,
                updateFavorites,
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