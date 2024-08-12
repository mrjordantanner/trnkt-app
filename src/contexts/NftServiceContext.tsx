import React, { createContext, useContext, ReactNode } from 'react';
import NftService from '../services/nftService';

interface Props {
    children: ReactNode;
}

const NftServiceContext = createContext<NftService | null>(null);
const nftService = new NftService();

export const NftServiceProvider: React.FC<Props> = ({ children }) => {
    return (
        <NftServiceContext.Provider 
            value={nftService}>
            {children}
        </NftServiceContext.Provider>
    );
};

export const useNftService = () => {
    const context = useContext(NftServiceContext);
    if (context === null) {
        throw new Error('useNftService must be used within a NftServiceProvider');
    }
    return context;
};