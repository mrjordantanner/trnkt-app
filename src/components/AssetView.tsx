import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AssetImage from './assetProperties/AssetImage';
import AssetName from './assetProperties/AssetName';
import AssetTraits from './assetProperties/AssetTraits';
import FavoritesToggleButton from './assetProperties/FavoritesToggleButton';
import Loading from './Loading';
import { Nft } from '../models/nft';
import { Box } from '@mui/material';
import LinkifyText from './LinkifyText';
import { useAssetContext } from '../contexts/AssetContext';

interface Props {
  addToFavorites: (asset: Nft) => void;
  removeFromFavorites: (asset: Nft) => void;
  localFavorites: Nft[] | null;
}

export default function AssetView({ addToFavorites, removeFromFavorites, localFavorites }: Props) {
  // Global state that represents the currently selected NFT from Gallery View
  const { selectedAsset, fetchNft } = useAssetContext();

  // TODO Do we still need these params?
  const { id, chain, address } = useParams<{ id: string, chain: string; address: string }>();

  const [assetInView, setAssetInView] = React.useState<Nft | null>(null);

  useEffect(() => {
    async function getSelectedAssetDetails(): Promise<Nft | null> {
      const asset = await fetchNft(selectedAsset);
      setAssetInView(asset);
      return asset;
    }

    getSelectedAssetDetails();
  }, [selectedAsset, id, chain, address]);

  if (!assetInView) {
    return <Loading />;
  }

  return (
    <>
      <Box className="asset-view-container">
        <AssetImage asset={assetInView} />

        <Box className="asset-properties">
          <AssetName name={assetInView.name} />
          <LinkifyText text={assetInView.description} />

          <ul className="property-list">
            <AssetTraits asset={assetInView} />

            <li className="flex-row id">ID: {assetInView.identifier}</li>
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
