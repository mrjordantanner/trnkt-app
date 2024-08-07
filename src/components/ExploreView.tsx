import React, { useEffect } from 'react';
import ExploreGallery from './ExploreGallery';
import ExploreSidebar from './ExploreSidebar';
import { Box } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';

// Main Explore screen consisting of a Sidebar and a Gallery
export default function ExploreView() {
	const { selectedAsset, nfts } = useAssetContext();

  useEffect(() => {
    if (!nfts) {
      // Fetch nfts from selected collection
    }
  }, []);

	return (
		<Box className='full-height-minus-bars'>
			<Box className='container'>
				<Box className='explore-main-content'>
					{/* Explore Gallery and Sidebar shown if no NFT selected */}
					{!selectedAsset && <ExploreSidebar />}
					{!selectedAsset && <ExploreGallery data={nfts} />}
				</Box>
			</Box>
		</Box>
	);
}
