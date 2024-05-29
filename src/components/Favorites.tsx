import React, { useEffect } from 'react';
import Card from './AssetCard';
//import diamond from '../images/diamond.svg';
import { Nft } from '../models/nft';
import { Box } from '@mui/material';

interface Props {
  chain: string;
  favorites: Nft[] | null;
  loadFavoritesData: () => void;
}

export default function Favorites({ chain, favorites, loadFavoritesData }: Props) {

  useEffect(() => {
    loadFavoritesData();
  }, [loadFavoritesData]); // Do we need loadFavoritesData as a dependency?  What does having a method in the dep array mean?

  if (!favorites || favorites.length == 0) {
    return <h2 className="empty">Favorites is empty.</h2>
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
            <Card asset={asset} chain={chain} key={asset?.identifier} />
          ))
        }
      </Box>
    </Box>
  );
}
