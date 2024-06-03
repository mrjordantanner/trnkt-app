/* eslint-disable @typescript-eslint/no-unused-vars */
//import { Link } from 'react-router-dom';
import React from 'react';
import { Nft } from '../models/nft';
import { Box, Card, CardContent, Button } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';

interface Props {
  asset: Nft;
}

export default function AssetCard({ asset }: Props) {
  const { selectedAsset, setSelectedAsset, fetchNfts, fetchNft } = useAssetContext();

  if (!asset) {
    return null;
  }

  const onClickAsset = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedAsset(asset);
    fetchNft(asset);
  };
  
  return (
    <Card className="card">
      <CardContent>
      <Box className="blur-bg"></Box> 
      {/* <a href={assetPath} className="link"> */}
      <Button sx={{ width: "100%", height: "100%", position: "fixed" }} onClick={onClickAsset}>

      </Button>
        <Box className="image">
          <img src={asset.image_url} alt={asset.name} />
        </Box>
        <Box className="details">
          <h2 className="name">{asset.name}</h2>
          <p className="id">ID: {asset.identifier}</p>
        </Box>
      {/* </a> */}
      </CardContent>
    </Card>
  );
}
