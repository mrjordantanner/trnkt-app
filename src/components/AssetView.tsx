import React, { useEffect, useState } from 'react';
import AssetTraits from './assetProperties/AssetTraits';
import FavoritesToggleButton from './assetProperties/FavoritesToggleButton';
import Loading from './Loading';
import { Nft } from '../models/nft';
import { Box, Typography, Link } from '@mui/material';
import LinkifyText from './LinkifyText';
import { useAssetContext } from '../contexts/AssetContext';

interface Props {
  addToFavorites: (asset: Nft) => void;
  removeFromFavorites: (asset: Nft) => void;
  localFavorites: Nft[] | null;
}

export default function AssetView({ addToFavorites, removeFromFavorites, localFavorites }: Props) {

  const { selectedAsset, fetchNft } = useAssetContext();
  const [assetInView, setAssetInView] = useState<Nft | null>(null);

  useEffect(() => {
    getSelectedAssetDetails();
  }, []);

  async function getSelectedAssetDetails(): Promise<Nft | null> {
    const asset = await fetchNft(selectedAsset);
    setAssetInView(asset);
    return asset;
  }

  if (!assetInView) {
    return <Loading />;
  }

  const descriptionStyle = {
    fontSize : '1.25rem',
    lineHeight: '1.5rem',
    color: 'lightgray',
    padding: '1rem',
    width: '100%',
    alignItems: 'left',
    border: '1px solid red'
  }

  return (
    <>
      <Box className="asset-view-container">
        <Box className="asset-view-image">
        {assetInView.animation_url ? (
          <video
            src={assetInView.animation_url}
            autoPlay
            loop
            muted
            controls
            style={{ height: '100%' }}
          >
            Sorry, the video can't play in this browser.
          </video>
        ) : (
          <img src={assetInView.image_url} alt={assetInView.name} style={{ width: '100%' }} />
        )}
      </Box>

        <Box className="asset-properties">
          <Typography className="name">{assetInView.name}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', height: '50px', border: '1px solid black' }}>
            <Typography className="id" sx={{ marginTop: '20px' }}>ID: {assetInView.identifier}</Typography>
            <Link href={assetInView.opensea_url} sx={{ color: 'cyan', fontWeight: 'bold', width: '500px', height: '100%' }} target="_blank" rel="noopener noreferrer">
                View on Opensea.io
              </Link>
            </Box>

          <Box sx={{ marginTop: '30px', backgroundColor: '#231222' }}>
            <LinkifyText text={assetInView.description} style={descriptionStyle} />
          </Box>

          <ul className="property-list">
            <AssetTraits asset={assetInView} />
          </ul>

          <FavoritesToggleButton
            asset={assetInView}
            localFavorites={localFavorites}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />

         
        </Box>
      </Box>
    </>
  );
}
