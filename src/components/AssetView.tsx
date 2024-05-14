import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AssetImage from './assetProperties/AssetImage';
import AssetName from './assetProperties/AssetName';
//import AssetPrice from './assetProperties/AssetPrice';
import AssetTraits from './assetProperties/AssetTraits';
import CollectionToggleButton from './assetProperties/CollectionToggleButton';
import Loading from './Loading';
import NftService from '../services/nftService';

import { NFT } from '../models/nft';

interface Props {
  addToCollection: (asset: NFT) => void;
  removeFromCollection: (asset: NFT) => void;
  localCollection: NFT[];
}

export default function AssetView({ addToCollection, removeFromCollection, localCollection }: Props ) {

const [asset, setAsset] = useState<NFT | null>(null);
const { contract, token } = useParams<{ contract: string; token: string }>();

  useEffect(() => {
    if (!asset) {

      // TODO do we really need to fetch again or just pass the NFT in here?
      NftService.getSingleAsset(contract, token)
        .then(setAsset);
    }
  }, [asset, contract, token]); 

  if (!asset) {
    return <Loading />;
  }

  return (
    <>
      <div className="asset-view-container">
        <AssetImage asset={asset} />

        <div className="asset-properties">
          <AssetName name={asset?.name} />
          <p className="description">{asset?.description}</p>

          <ul className="property-list">
            <AssetTraits asset={asset} />
            {/* <AssetPrice price={asset?.price} /> */}
            <li className="flex-row id">ID: {asset?.id}</li>
          </ul>

          <CollectionToggleButton 
            asset={asset} 
            localCollection={localCollection} 
            addToCollection={addToCollection} 
            removeFromCollection={removeFromCollection} 
          />
        </div>
      </div>
    </>
  );
}
