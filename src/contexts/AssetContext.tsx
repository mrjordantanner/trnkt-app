import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NftModel } from '../models/nftModel';
import { Collection } from '../models/collection';
//import NftService from '../services/service';

interface AssetContextType {
  featuredCollectionSlugs: string[];
  nfts: NftModel[] | null;
  setNfts:  React.Dispatch<React.SetStateAction<NftModel[] | null>>;
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

  shouldFillMedia: boolean;
  setShouldFillMedia: React.Dispatch<React.SetStateAction<boolean>>;

  //collectionMenuOptions: MenuOption[] | null;
  //getLocalCollectionBySlug: (slug: string) => Collection | null;
}

interface Props {
  children: ReactNode;
}

// TODO Export this
// interface MenuOption {
//   label: string;
//   value: string;
// }


const defaultNftLimit = 50;
const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<Props> = ({ children }) => {

  const [nfts, setNfts] = useState<NftModel[] | null>(null);
  const [nextNftCursor, setNextNftCursor] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[] | null>([]);
  // const [collectionMenuOptions, setCollectionMenuOptions] = useState<MenuOption[]>([]);
  const [nextCollectionCursor, setNextCollectionCursor] = useState<string | null>(null);
  const [selectedCollection, _setCollection] = useState<Collection | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<NftModel | null>(null);
  const [nftLimit, setNftLimit] = useState<number>(defaultNftLimit);
  const [shouldFillMedia, setShouldFillMedia] = useState(false);

  // Custom 'setState' method to reset nextCursor if we're switching Collections
  const setCollection = (collection: Collection | null) => {
    if (selectedCollection != collection) { 
      setNextNftCursor(null); 
    }
    _setCollection(collection);
  };

  // const getLocalCollectionBySlug = (slug: string): Collection | null => {
  //   if (collections) {
  //     const collection = collections.find(collection => collection.collection === slug);
  //     return collection || null;
  //   }
  //   return null;
  // };

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

  // Creates dropdown menu options from the Featured Collection slugs
  // useEffect(() => {
  //   if (featuredCollectionSlugs) {
  //     const options = featuredCollectionSlugs.map(slug => ({
  //       label: slug,
  //       value: slug
  //     }));
  //     setCollectionMenuOptions(options);
  //   }
  // }, [featuredCollectionSlugs]);

  return (
    <AssetContext.Provider value={{
      featuredCollectionSlugs,
      nfts, setNfts,
      nftLimit, setNftLimit,
      nextNftCursor, setNextNftCursor,
      collections, setCollections,
      nextCollectionCursor, setNextCollectionCursor,
      selectedCollection, setCollection,
      selectedAsset, setSelectedAsset,
      shouldFillMedia, setShouldFillMedia
      //collectionMenuOptions,
      //getLocalCollectionBySlug
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
