import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Nft } from '../models/nft';
import NftService from '../services/service';

interface AssetContextType {
  selectedAsset: Nft | null;
  setSelectedAsset: (asset: Nft | null) => void;
  fetchNfts: (collectionSlug: string) => Promise<Nft[] | null>;
  fetchNft: (assetToGet: Nft | null) => Promise<Nft | null>;
}

interface Props {
  children: ReactNode;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<Props> = ({ children }) => {
  const [selectedAsset, setSelectedAsset] = useState<Nft | null>(null);
  const nftService = new NftService();

  const fetchNfts = async (collectionSlug: string) => {
    return await nftService.fetchNfts(collectionSlug);
  };

  const fetchNft = async (assetToGet: Nft | null) => {
    return await nftService.fetchNft(assetToGet);
  };

  return (
    <AssetContext.Provider value={{ selectedAsset, setSelectedAsset, fetchNfts, fetchNft }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssetContext = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssetContext must be used within an AssetProvider');
  }
  return context;
};
