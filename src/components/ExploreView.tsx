import React, { useEffect } from 'react';
import ExploreSidebar from './ExploreSidebar';
import ExploreGallery from './ExploreGallery';
import AssetView from './AssetView';
import AssetSidebar from './AssetSidebar';
import { Nft } from '../models/nft';
import { Box } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';

interface Props {
  addToFavorites: (asset: Nft | null) => void;
  removeFromFavorites: (asset: Nft | null) => void;
  localFavorites: Nft[] | null;
}

// Main Explore screen consisting of a Sidebar and a Gallery
export default function ExploreView({ addToFavorites, removeFromFavorites, localFavorites }: Props) {

  const { nftLimit, selectedAsset, fetchNfts, selectedCollection, nextNftCursor, setNextNftCursor, nfts, setNfts } = useAssetContext();

  useEffect(() => {
    getNftBatch();
  }, []);  // selectedCollection

  async function getNftBatch(): Promise<{ nfts: Nft[], next: string | null }> {
    const response = await fetchNfts(selectedCollection, nftLimit, nextNftCursor);
    console.log(response);
    setNfts(response.nfts);
    setNextNftCursor(response.next)
    return response;
  }

  return (
    <>
    <Box className="explore-container">

        {/* Explore Gallery and Sidebar shown if no NFT selected */}
        {!selectedAsset && <ExploreSidebar getNftBatch={getNftBatch} />}
        {!selectedAsset && <ExploreGallery data={nfts} />}

        {/* Detailed Asset View with Sidebar shown if NFT is selected */}
        {selectedAsset && <AssetSidebar />}
        {selectedAsset && <AssetView 
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          localFavorites={localFavorites} />}

        {/* <footer className="footer"></footer>  */}

      </Box>
    </>
  );
}
