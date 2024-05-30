//import { Link } from 'react-router-dom';
import React from 'react';
import { Nft } from '../models/nft';
import { Box, Card, CardContent, Button } from '@mui/material';

interface Props {
  asset: Nft;
  chain: string;
  fetchAsset: (id : string | undefined, chain : string | undefined, address : string | undefined) => void;

}

export default function AssetCard({ asset, fetchAsset, chain }: Props) {
  
  if (!asset) {
    return null;
  }

  //const assetPath = `/chain/${chain}/contract/${asset.contract}/nfts/${asset.identifier}`;

  const onClickAsset = (event: React.MouseEvent<HTMLButtonElement>) => {
    fetchAsset(asset.identifier, chain, asset.contract)
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
