import React, { useEffect } from 'react';
import AssetCard from './asset/AssetCard';
import Loading from './utils/Loading';
import AssetView from './asset/AssetView';
import { NftModel } from '../models/nftModel';
import { Box } from '@mui/material';
import { useNftService } from '../contexts/NftServiceContext';
import { useAssetContext } from '../contexts/AssetContext';

// Display Randomized batch of NFTs in a Grid
export default function RandomGallery() {

  const { featuredCollectionSlugs, nftLimit, nfts, setNfts, selectedAsset } = useAssetContext();
  const nftService = useNftService();

  useEffect(() => {
    getRandomBatch(featuredCollectionSlugs, nftLimit);
  }, []);

  async function getRandomBatch(collectionSlugs : string[], nftLimit : number = 50) {
    const response = await nftService.fetchRandomNftBatch(featuredCollectionSlugs, nftLimit);
    console.log(response.nfts);
    setNfts(response.nfts);
  }

  if (!nfts) {
    return <Loading />;
  }

  return (
    <Box className="explore-container">

    {selectedAsset && <AssetView />}

    {!selectedAsset && <Box className="gallery-wrapper">
      <Box className="asset-grid">
        {nfts.map((asset: NftModel, index: number) => (
          <AssetCard asset={asset} key={`${asset.identifier}-${index}`} />
        ))}
      </Box>
    </Box> }



    </Box>
  );
}
