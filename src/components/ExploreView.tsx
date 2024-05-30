import React from 'react';
import ExploreSidebar from './ExploreSidebar';
import ExploreGallery from './ExploreGallery';
import AssetView from './AssetView';
import AssetSidebar from './AssetSidebar';
import { Nft } from '../models/nft';
import { Box, Typography } from '@mui/material';
//import diamond from '../images/diamond.svg';

interface Props {
  asset: Nft | null;
  data: Nft[] | null;
  chain: string;
  selectedCollection: string;
  setAsset: React.Dispatch<React.SetStateAction<Nft | null>>;
  fetchAsset: (id : string | undefined, chain : string | undefined, address : string | undefined) => void;
  setCollection: React.Dispatch<React.SetStateAction<string>>;
  fetchData: () => void;
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
export default function ExploreView({ data, chain, fetchAsset, selectedCollection, setCollection, fetchData, addToFavorites, removeFromFavorites, localFavorites, asset, setAsset }: Props) {


  return (
    <>

    {/* Developer Stats */}
      <Typography sx={{color: 'white', paddingTop: "80px" }}>
        Favorites: {localFavorites?.length} <br />
        Selected Asset: {asset?.name} <br />
        Selected Collection: {selectedCollection} <br />
        </Typography>

      <Box sx={containerStyle}>

        {/* <div className="gem-background-wrapper">
          <img className="gem-background invert" src={diamond} alt="diamond" />
        </div> */}

        {!asset && <ExploreSidebar setCollection={setCollection} selectedCollection={selectedCollection} fetchData={fetchData} />}
        {asset && <AssetSidebar asset={asset} setAsset={setAsset} />}

        {!asset && <ExploreGallery data={data} chain={chain} fetchAsset={fetchAsset}/>}
        {asset && <AssetView 
          asset={asset} 
          setAsset={setAsset} 
          fetchAsset={fetchAsset}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          localFavorites={localFavorites} />}

        {/* <footer className="footer"></footer>  */}

      </Box>
    </>
  );
}
