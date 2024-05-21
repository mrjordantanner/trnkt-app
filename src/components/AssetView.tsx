import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AssetImage from './assetProperties/AssetImage';
import AssetName from './assetProperties/AssetName';
//import AssetPrice from './assetProperties/AssetPrice';
import AssetTraits from './assetProperties/AssetTraits';
import CollectionToggleButton from './assetProperties/CollectionToggleButton';
import Loading from './Loading';
import { service } from '../App'
import { Nft } from '../models/nft';

interface Props {
  addToCollection: (asset: Nft) => void;
  removeFromCollection: (asset: Nft) => void;
  localCollection: Nft[];
}

export default function AssetView({ addToCollection, removeFromCollection, localCollection }: Props ) {

const [asset, setAsset] = useState<Nft | null>(null);
const { id, chain, address } = useParams<{ id: string, chain: string; address: string }>();

  useEffect(() => {
    if (!asset) {
      service.fetchNft(id, chain, address)
        .then(setAsset);
    }
  }, [asset, id, chain, address]); 

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
