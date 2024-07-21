import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NftModel } from '../models/nftModel';
import ObjectViewer from './utils/ObjectViewer';
import { useAssetContext } from './../contexts/AssetContext';

interface Props {
    nfts: NftModel[];
}



const HorizontalScroll = ({ nfts }: Props) => {
  const { setSelectedAsset } = useAssetContext();

  const onClickAsset = (asset: NftModel) => {
    setSelectedAsset(asset);
    // nftService.fetchNft(asset);
    console.log(asset);
  };


  return (
    <Box 
      className="scrollbar"
      sx={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        margin: '0 auto',
        bgcolor: 'black',
        p: 1
        
      }}
    >
      {nfts.map((nft) => (
        <Box 
          key={nft.identifier} 
          sx={{
            width: '150px',
            height: '250px',
            display: 'inline-block',
            margin: '0 10px',
            textAlign: 'center',
            p: 1,
            bgcolor: '#343434',
          }}
        >

          <Button sx={{ width: "100%", height: "100%", position: "fixed" }} 
            onClick={() => onClickAsset(nft)} />

          <Typography sx={{ fontWeight: 600 }}>{nft.name}</Typography>
          <img src={nft.imageUrl} style={{ objectFit: 'contain', width: '90%' }}/>
          <ObjectViewer data={nft} />

        </Box>
      ))}
    </Box>
  );
}

export default HorizontalScroll;
