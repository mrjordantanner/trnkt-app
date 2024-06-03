import React, { useRef } from 'react';
import AssetCard from './AssetCard';
import Loading from './Loading';
import { Nft } from '../models/nft';
import { Box } from '@mui/material';
//import diamond from '../images/diamond.svg';

interface Props {
  data: Nft[] | null;
}

// Display NFTs in a Grid
export default function ExploreGallery({ data }: Props) {

  const gallery = useRef<HTMLDivElement>(null);

  if (!data) {
    return <Loading />;
  }

  return (
    <>
    <Box className="gallery-wrapper" ref={gallery}>
      <Box className="asset-grid">
        {data.map((asset: Nft) => (
          <AssetCard asset={asset} key={asset.identifier} />
        ))}
      </Box>
      </Box>
    </>
  );
}
