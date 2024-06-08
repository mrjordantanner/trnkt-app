import React from 'react';
import { Box, Button} from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
//import clsx from 'clsx';   // utility that helps you conditionally join class names together

// Sidebar for AssetView
export default function AssetSidebar() {

  const { selectedAsset, setSelectedAsset } = useAssetContext();

  const onClearAsset = () => {
    setSelectedAsset(null);
  }

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    width: 500,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
   //backgroundColor: 'green',
  }

  const contentsStyle = {
    height: '50vh',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50px',
    //backgroundColor: 'chartreuse',
  }

  const buttonStyle = {
    border: "1px solid white",
    backgroundColor: "gray",
    color: "white",
    margin: '10px',
  }

  return (
    <>
      <Box sx={containerStyle}>
        <Box sx={contentsStyle}>

        <h2>{selectedAsset?.name}</h2>
        <Button sx={buttonStyle} onClick={onClearAsset}>BACK TO COLLECTION</Button>


        </Box>
      </Box>
    </>
	);
}
