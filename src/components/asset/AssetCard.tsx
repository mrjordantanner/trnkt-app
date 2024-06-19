/* eslint-disable @typescript-eslint/no-unused-vars */
//import { Link } from 'react-router-dom';
import React from 'react';
import { Nft } from '../../models/nft';
import { Box, Card, CardContent, Button } from '@mui/material';
import { useAssetContext } from '../../contexts/AssetContext';
import { useNftService } from '../../contexts/NftServiceContext';

interface Props {
  asset: Nft;
}

export default function AssetCard({ asset }: Props) {
  const { selectedAsset, setSelectedAsset } = useAssetContext();
  const nftService = useNftService();
  if (!asset) {
    return null;
  }

  const onClickAsset = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedAsset(asset);
    nftService.fetchNft(asset);
  };
  
  return (
    <Card className="card" sx={{backgroundColor: '#131313', padding: 0 }} >
      <CardContent sx={{ border: '1px solid lightgray', padding: 0 }}>

        {/* <Box className="blur-bg"></Box>  */}

        <Button sx={{ width: "100%", height: "100%", position: "fixed" }} onClick={onClickAsset}>
        </Button>

        <Box className="details">
          <h2 className="name">{asset.name}</h2>
        </Box>

        <Box className="image">
          <img src={asset.image_url} alt={asset.name} />
        </Box>



      </CardContent>
    </Card>
  );
}
