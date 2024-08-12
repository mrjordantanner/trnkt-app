import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NftModel } from '../models/nftModel';
import { Collection } from '../models/collection';
import NftService from '../services/nftService';


interface AssetContextType {
  featuredCollectionSlugs: string[];
  getLocalCollectionBySlug: (slug: string) => Collection | undefined;

  nfts: NftModel[] | null;
  setNfts:  React.Dispatch<React.SetStateAction<NftModel[] | null>>;

  getNftBatch(): Promise<{nfts: NftModel[]; next: string | null;}>
  getRandomBatch(collectionSlugs: string[], nftLimit: number): Promise<{nfts: NftModel[]; next: string | null;}>

  nextNftCursor: string | null;
  setNextNftCursor: React.Dispatch<React.SetStateAction<string | null>>;

  nextCollectionCursor: string | null;
  setNextCollectionCursor: React.Dispatch<React.SetStateAction<string | null>>;

  collections: Collection[] | null;
  setCollections: React.Dispatch<React.SetStateAction<Collection[] | null>>;

  selectedCollection: Collection | null;
  setCollection: (collection: Collection | null) => void;

  selectedAsset: NftModel | null;
  setSelectedAsset: (asset: NftModel | null) => void;

  nftLimit: number;
  setNftLimit: React.Dispatch<React.SetStateAction<number>>;

  setCollectionMenuOptions: React.Dispatch<React.SetStateAction<{ label: string, value: string }[]>>;
  collectionMenuOptions: { label: string, value: string }[] | undefined;
}

interface Props {
  children: ReactNode;
}

const defaultNftLimit = 50;
const AssetContext = createContext<AssetContextType | undefined>(undefined);
const nftService = new NftService();

export const AssetProvider: React.FC<Props> = ({ children }) => {

  const [nfts, setNfts] = useState<NftModel[] | null>(null);
  const [nextNftCursor, setNextNftCursor] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[] | null>([]);
  const [collectionMenuOptions, setCollectionMenuOptions] = useState<{ label: string, value: string }[]>([]);
  const [nextCollectionCursor, setNextCollectionCursor] = useState<string | null>(null);
  const [selectedCollection, _setCollection] = useState<Collection | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<NftModel | null>(null);
  const [nftLimit, setNftLimit] = useState<number>(defaultNftLimit);

  // useEffect(() => {
 
  // }, []);

  // Custom 'setState' method to reset nextCursor if we're switching Collections
  const setCollection = (collection: Collection | null) => {
    if (selectedCollection != collection) { 
      setNextNftCursor(null); 
    }
    _setCollection(collection);
  };

  const getNftBatch = async (): Promise<{nfts: NftModel[];next: string | null;}> => {
    if (!selectedCollection) {
      return { nfts: [], next: null };
    }
    const response = await nftService.fetchNfts(
      selectedCollection.collection,
      nftLimit,
      nextNftCursor
    );
    setNfts(response.nfts);
    setNextNftCursor(response.next);
    return response;
  };

  const getRandomBatch = async (collectionSlugs: string[], nftLimit: number = 50): Promise<{nfts: NftModel[];next: string | null;}> =>  {
		const response = await nftService.fetchRandomNftBatch(featuredCollectionSlugs, nftLimit);
		setNfts(response.nfts);
    return { nfts: response.nfts, next: response.next };
	}
  
  const getLocalCollectionBySlug = (slug: string): Collection | undefined => {
    if (collections) {
      return collections.find(collection => collection.collection === slug);
    }
  };

  const featuredCollectionSlugs: string[] = [
    'paschamo-brushtalk-absractions',
    'byopill',
     //'asm-brains',
    'synthetic-dreams',
    'new-dimension-huemin',
    'parallel-on-base',
    'terraforms',
    //'courtyard-nft',
    'daily-xyz',
    'rtfkt-project-animus',
    'pixelmongen1',
    'xcopy-remnants',
    'the-vault-of-wonders-chapter-1-the-abyssal-unseen',
    'azuki',
    'castile-tarot',
    'screens-by-thomas-lin-pedersen',
    'midnightbreeze',
    //'drip-drop-by-dave-krugman',
  
  ];

  return (
    <AssetContext.Provider value={{
      featuredCollectionSlugs,
      getNftBatch, getRandomBatch,
      nfts, setNfts,
      nftLimit, setNftLimit,
      nextNftCursor, setNextNftCursor,
      collections, setCollections,
      nextCollectionCursor, setNextCollectionCursor,
      selectedCollection, setCollection,
      selectedAsset, setSelectedAsset,
      collectionMenuOptions, setCollectionMenuOptions,
      getLocalCollectionBySlug
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
