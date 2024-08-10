import React from 'react';
import AssetCard from './asset/AssetCard';
import Loading from './utils/Loading';
import { NftModel } from '../models/nftModel';
import { Box } from '@mui/material';

interface Props {
  data: NftModel[] | null;
}

export default function ExploreGallery({ data }: Props) {

  if (!data) {
    return <Loading />;
  }

  return (
    <Box className='gallery explore-gallery' >
      <Box className='asset-grid'>
        {data.map((asset: NftModel) => (
          <AssetCard asset={asset} key={asset.identifier} />
        ))}
      </Box>
    </Box>
  );
}
