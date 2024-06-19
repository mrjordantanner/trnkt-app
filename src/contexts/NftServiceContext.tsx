import React, { createContext, useContext, ReactNode } from 'react';
import NftService from '../services/nftService';

const NftServiceContext = createContext<NftService | null>(null);

export const useNftService = () => {
    const context = useContext(NftServiceContext);
    if (context === null) {
        throw new Error('useNftService must be used within a NftServiceProvider');
    }
    return context;
};

const nftService = new NftService();

interface Props {
    children: ReactNode;
}

export const NftServiceProvider: React.FC<Props> = ({ children }) => {
    return (
        <NftServiceContext.Provider 
            value={nftService}>
            {children}
        </NftServiceContext.Provider>
    );
};
