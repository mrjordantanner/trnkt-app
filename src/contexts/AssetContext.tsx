import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Nft } from '../models/nft';
import { Collection } from '../models/collection';
import NftService from '../services/service';

interface AssetContextType {
  nfts: Nft[] | null;
  setNfts:  React.Dispatch<React.SetStateAction<Nft[]>>;
  nextNftCursor: string | null;
  setNextNftCursor: React.Dispatch<React.SetStateAction<string | null>>;
  nextCollectionCursor: string | null;
  setNextCollectionCursor: React.Dispatch<React.SetStateAction<string | null>>;

  collections: Collection[] | null;
  setCollections: React.Dispatch<React.SetStateAction<Collection[] | null>>;

  selectedCollection: string;
  setCollection: (collection: string) => void;

  selectedAsset: Nft | null;
  setSelectedAsset: (asset: Nft | null) => void;
  nftLimit: number;
  setNftLimit: React.Dispatch<React.SetStateAction<number>>;

  fetchNfts: (collectionSlug: string, limit: number, next: string | null) => Promise<{ nfts: Nft[], next: string | null }>;
  fetchNft: (assetToGet: Nft | null) => Promise<Nft | null>;
  fetchCollection: (collectionSlug: string) => Promise<Collection | null>;
  fetchCollections: (next: string | null) => Promise<{ collections: Collection[] | null, next: string | null }>;

}

interface Props {
  children: ReactNode;
}

const defaultCollection = 'parallel-on-base';
const defaultNftLimit = 50;

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<Props> = ({ children }) => {

  const [nfts, setNfts] = useState<Nft[]>([]);
  const [nextNftCursor, setNextNftCursor] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[] | null>([]);
  const [nextCollectionCursor, setNextCollectionCursor] = useState<string | null>(null);
  const [selectedCollection, _setCollection] = useState<string>(defaultCollection);
  const [selectedAsset, setSelectedAsset] = useState<Nft | null>(null);
  const [nftLimit, setNftLimit] = useState<number>(defaultNftLimit);


  // Custom 'setState' method to reset nextCursor if we're switching Collections
  const setCollection = (collection: string) => {
    if (selectedCollection != collection) { 
      setNextNftCursor(null); 
    }
    _setCollection(collection);
  };

  const nftService = new NftService();

  const fetchNfts = async (collectionSlug: string, limit: number = 50, next: string | null = null) => {
    return await nftService.fetchNfts(collectionSlug, limit, next);
  };

  const fetchNft = async (assetToGet: Nft | null) => {
    return await nftService.fetchNft(assetToGet);
  };

  const fetchCollection = async (collectionSlug: string) => {
    return await nftService.fetchCollection(collectionSlug);
  };

  const fetchCollections = async (next: string | null = null) => {
    return await nftService.fetchCollections(next);
  };

  return (
    <AssetContext.Provider value={{
      nfts, setNfts,
      nftLimit, setNftLimit,
      nextNftCursor, setNextNftCursor,
      collections, setCollections,
      nextCollectionCursor, setNextCollectionCursor,
      selectedCollection, setCollection,
      selectedAsset, setSelectedAsset,
      fetchCollection,
      fetchCollections,
      fetchNfts, 
      fetchNft 
      }}>
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