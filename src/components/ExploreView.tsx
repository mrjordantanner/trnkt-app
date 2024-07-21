import React, { useEffect } from 'react';
//import ExploreSidebar from './ExploreSidebar';
import ExploreGallery from './ExploreGallery';
import AssetView from './asset/AssetView';
//import AssetSidebar from './AssetSidebar';
import { NftModel} from '../models/nftModel';
import { Box } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
import { useNftService } from '../contexts/NftServiceContext';


// Main Explore screen consisting of a Sidebar and a Gallery
export default function ExploreView() {

  const { nftLimit, selectedAsset, selectedCollection, nextNftCursor, setNextNftCursor, nfts, setNfts } = useAssetContext();

  const nftService = useNftService();

  useEffect(() => {
    setNfts(null);
    getNftBatch();
  }, []);  // selectedCollection

  async function getNftBatch(): Promise<{ nfts: NftModel[], next: string | null }> {
    if (!selectedCollection) { 
      return { nfts: [], next: null }
    }

    const response = await nftService.fetchNfts(selectedCollection.collection, nftLimit, nextNftCursor);
    console.log(response);
    setNfts(response.nfts);
    setNextNftCursor(response.next)
    return response;
  }

  const containerStyle = {
    display: 'flex',
    width: '100vw',
    //border: '5px solid yellow'

  }

  return (
    <Box className="full-height-plus-navbar" sx={containerStyle}>

        {/* Explore Gallery and Sidebar shown if no NFT selected */}
        {/* {!selectedAsset && <ExploreSidebar />} */}
        {!selectedAsset && <ExploreGallery data={nfts} />}

        {/* Detailed Asset View with Sidebar shown if NFT is selected */}
        {/* {selectedAsset && <AssetSidebar />} */}
        {selectedAsset && <AssetView />}

        {/* <footer className="footer"></footer>  */}

      </Box>
  );
}
