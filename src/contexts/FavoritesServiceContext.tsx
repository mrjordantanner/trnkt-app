import React, { createContext, useContext, ReactNode } from 'react';
import FavoritesService from '../services/favoritesService';

const FavoritesServiceContext = createContext<FavoritesService | null>(null);

export const useFavoritesService = () => {
    const context = useContext(FavoritesServiceContext);
    if (context === null) {
        throw new Error('useFavoritesService must be used within a FavoritesServiceProvider');
    }
    return context;
};

const favoritesService = new FavoritesService();

interface Props {
    children: ReactNode;
}

export const FavoritesServiceProvider: React.FC<Props> = ({ children }) => {
    return (
        <FavoritesServiceContext.Provider 
            value={favoritesService}>
            {children}
        </FavoritesServiceContext.Provider>
    );
};
