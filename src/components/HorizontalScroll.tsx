import React from 'react';
import { Box, Typography } from '@mui/material';
import { NftModel } from '../models/nftModel';
import ObjectViewer from './utils/ObjectViewer';

interface Props {
    nfts: NftModel[];
}

const HorizontalScroll = ({ nfts }: Props) => {
  //const boxes = Array.from({ length: 10 }, (_, index) => index + 1); // Example array to generate 10 boxes

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
            <Typography sx={{ fontWeight: 600 }}>{nft.name}</Typography>
            <img src={nft.imageUrl} style={{ objectFit: 'contain', width: '90%' }}/>
            <ObjectViewer data={nft} />

        </Box>
      ))}
    </Box>
  );
}

export default HorizontalScroll;
