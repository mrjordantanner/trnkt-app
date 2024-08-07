import React from 'react';
import { Box } from '@mui/material';
import { NftModel } from '../../models/nftModel';
import FavoriteCard from '../favorites/FavoriteCard';

interface Props {
    nfts: NftModel[];
}

export default function FavoritesContainer ({ nfts }: Props) {
  return (
    <Box 
      className="scrollbar grid-2">
      {nfts.map((nft, index) => (
        <FavoriteCard asset={nft} key={index} />
      ))}
    </Box>
  );
}