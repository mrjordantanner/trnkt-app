import React, { useEffect } from 'react';
import AssetCard from './AssetCard';
import { Nft } from '../models/nft';
import { Box } from '@mui/material';

interface Props {
  favorites: Nft[] | null;
  loadFavoritesData: () => void;
}

export default function Favorites({ favorites, loadFavoritesData  }: Props) {

  useEffect(() => {
    loadFavoritesData();
  }, [loadFavoritesData]); // Do we need loadFavoritesData as a dependency?  What does having a method in the dep array mean?

  if (!favorites || favorites.length == 0) {
    return <Box className="empty-favorites">
      <h2>You have no saved Favorites.</h2>
      </Box>
  }

  return (
    <Box className="collection-wrapper">
      <h1 className="header">F A V O R I T E S</h1>
      {/* <div className="gem-background-wrapper">
        <img className="gem-background" src={diamond} alt="diamond" />
      </div> */}
      <Box className="container">
        {
          favorites.map((asset: Nft) => (
            <AssetCard asset={asset} key={asset?.identifier} />
          ))
        }
      </Box>
    </Box>
  );
}
