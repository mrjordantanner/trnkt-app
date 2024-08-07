import React, { useEffect } from 'react';
import AssetCard from './asset/AssetCard';
import Loading from './utils/Loading';
import { NftModel } from '../models/nftModel';
import { Box } from '@mui/material';
import { useNftService } from '../contexts/NftServiceContext';
import { useAssetContext } from '../contexts/AssetContext';
import Gem from '../images/Gem-1.png';
import SectionHeader from '../components/SectionHeader';


// Display Randomized batch of NFTs in a Grid
export default function RandomGallery() {

  const { featuredCollectionSlugs, nftLimit, nfts, setNfts, setSelectedAsset } = useAssetContext();
  const nftService = useNftService();

  useEffect(() => {
    setSelectedAsset(null);
    setNfts(null);
    getRandomBatch(featuredCollectionSlugs, nftLimit);
  }, []);

  async function getRandomBatch(collectionSlugs : string[], nftLimit : number = 50) {
    const response = await nftService.fetchRandomNftBatch(featuredCollectionSlugs, nftLimit);
    setNfts(response.nfts);
  }

  if (!nfts) {
    return <Loading />;
  }

  return (
    <>
    <SectionHeader title={'RANDOM'} imgSrc={Gem} />
      <Box className="gallery">
        <Box className="asset-grid">
          {nfts.map((asset: NftModel, index: number) => (
            <AssetCard asset={asset} key={`${asset.identifier}-${index}`} />
          ))}
        </Box>
      </Box> 
      </>
  );
}
