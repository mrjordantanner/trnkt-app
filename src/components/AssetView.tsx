import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AssetImage from './assetProperties/AssetImage';
import AssetName from './assetProperties/AssetName';
import AssetTraits from './assetProperties/AssetTraits';
import FavoritesToggleButton from './assetProperties/FavoritesToggleButton';
import Loading from './Loading';
//import { service } from '../App'
import { Nft } from '../models/nft';
import { Box } from '@mui/material';
import LinkifyText from './LinkifyText';

interface Props {
  asset : Nft | null;
  setAsset: React.Dispatch<React.SetStateAction<Nft | null>>;
  fetchAsset: (id : string | undefined, chain : string | undefined, address : string | undefined) => void;
  addToFavorites: (asset: Nft) => void;
  removeFromFavorites: (asset: Nft) => void;
  localFavorites: Nft[] | null;
}

export default function AssetView({ asset, fetchAsset, addToFavorites, removeFromFavorites, localFavorites }: Props ) {

const { id, chain, address } = useParams<{ id: string, chain: string; address: string }>();

  useEffect(() => {
    if (!asset) {
      fetchAsset(id, chain, address);
    }
  }, [asset, id, chain, address]);

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

          <FavoritesToggleButton 
            asset={asset} 
            localFavorites={localFavorites} 
            addToFavorites={addToFavorites} 
            removeFromFavorites={removeFromFavorites} 
          />
        </Box>
      </Box>
    </>
  );
}
