import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AssetImage from './assetProperties/AssetImage';
import AssetName from './assetProperties/AssetName';
import AssetTraits from './assetProperties/AssetTraits';
import CollectionToggleButton from './assetProperties/CollectionToggleButton';
import Loading from './Loading';
import { service } from '../App'
import { Nft } from '../models/nft';
import { Box } from '@mui/material';
import LinkifyText from './LinkifyText';

interface Props {
  addToCollection: (asset: Nft) => void;
  removeFromCollection: (asset: Nft) => void;
  localCollection: Nft[] | null;
}

export default function AssetView({ addToCollection, removeFromCollection, localCollection }: Props ) {

const [asset, setAsset] = useState<Nft | null>(null);
const { id, chain, address } = useParams<{ id: string, chain: string; address: string }>();

  useEffect(() => {
    if (!asset) {
      fetchData(id, chain, address);
      console.log('asset');
      console.log(asset);
    }
  }, [asset, id, chain, address]);

  const fetchData = async (id : string | undefined, chain : string | undefined, address : string | undefined) => {
    console.log(`Fetching NFT id: ${id}...`);
  
    try {
      const nft: Nft | null = await service.fetchNft(id, chain, address);
      console.log(nft);
      setAsset(nft);

    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  if (!asset) {
    return <Loading />;
  }

  return (
    <>
      <Box className="asset-view-container">
        <AssetImage asset={asset} />

        <Box className="asset-properties">
          <AssetName name={asset?.name} />
          <LinkifyText text={asset?.description} ></LinkifyText>

          <ul className="property-list">
            <AssetTraits asset={asset} />

            <li className="flex-row id">ID: {asset?.identifier}</li>
          </ul>

          <CollectionToggleButton 
            asset={asset} 
            localCollection={localCollection} 
            addToCollection={addToCollection} 
            removeFromCollection={removeFromCollection} 
          />
        </Box>
      </Box>
    </>
  );
}
