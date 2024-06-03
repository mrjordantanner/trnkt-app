import React from 'react';
import ExploreSidebar from './ExploreSidebar';
import ExploreGallery from './ExploreGallery';
import AssetView from './AssetView';
import AssetSidebar from './AssetSidebar';
import { Nft } from '../models/nft';
import { Box, Typography } from '@mui/material';
//import diamond from '../images/diamond.svg';
import { useAssetContext } from '../contexts/AssetContext';

interface Props {
  data: Nft[] | null;
  selectedCollection: string;
  setCollection: React.Dispatch<React.SetStateAction<string>>;
  addToFavorites: (asset: Nft | null) => void;
  removeFromFavorites: (asset: Nft | null) => void;
  localFavorites: Nft[] | null;
}

const containerStyle = {
  display: "flex",
  width: "100vw",
  height: "100%",
  flexDirection: "row",
  paddingTop: "10px"
  //backgroundColor: "red",

}

// Main Explore screen consisting of a Sidebar and a Gallery
export default function ExploreView({ data, selectedCollection, setCollection, addToFavorites, removeFromFavorites, localFavorites }: Props) {

  const { selectedAsset } = useAssetContext();

  return (
    <>
    {/* Developer Stats */}
      <Typography sx={{color: 'white', paddingTop: "80px" }}>
        Favorites: {localFavorites?.length} <br />
        Selected Asset: {selectedAsset?.name} <br />
        Selected Collection: {selectedCollection} <br />
        </Typography>

      <Box sx={containerStyle}>

        {!selectedAsset && <ExploreSidebar setCollection={setCollection} 
        selectedCollection={selectedCollection} />}
        {!selectedAsset && <ExploreGallery data={data} />}

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
