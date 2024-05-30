import React from 'react';
import { Box, Button } from '@mui/material';
import { Nft } from '../models/nft';
//import clsx from 'clsx';   // utility that helps you conditionally join class names together
//import diamond from '../images/diamond.svg';

interface Props {
  asset: Nft | null;
  setAsset: React.Dispatch<React.SetStateAction<Nft | null>>;
}

// Sidebar for AssetView
export default function AssetSidebar({ asset, setAsset }: Props) {

  const containerStyle = {

    display: 'flex',
    height: '100vh',
    width: 500,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'green',


  }

  const contentsStyle = {
    height: '50vh',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50px',
    backgroundColor: 'chartreuse',
  }

  const onClearAsset = () => {
    setAsset(null);
  }

  const buttonStyle = {
    border: "1px solid white",
    backgroundColor: "gray",
    color: "white",
  }
  

  return (
    <>
      <Box sx={containerStyle}>

        <Box sx={contentsStyle}>
        <Button sx={buttonStyle} onClick={onClearAsset}>CLEAR ASSET</Button>
          {asset?.name}
        </Box>
      </Box>
    </>
	);
}
