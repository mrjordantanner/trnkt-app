import React from 'react';
import { useAssetContext } from '../contexts/AssetContext';
import { Box, Button, Typography } from '@mui/material';

export default function MediaSettings() {

    const { shouldFillMedia, setShouldFillMedia } = useAssetContext();

  const handleToggleClass = () => {
    setShouldFillMedia(prevState => !prevState);
  };

  return (
    <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      alignItems: 'center', 
      width: '300px', 
      //border: '1px solid gray',
      ml: 5
      }}>

      <Typography 
      className='flex-center color-primary'
      sx={{ padding: '0px 10px'}}>
        Media Style</Typography>

      <Button 
      sx={{ height: '20px' }}
      variant={shouldFillMedia ? 'contained' : 'outlined'}
      onClick={handleToggleClass}>
        {shouldFillMedia ? 'Filled' : 'Contained'}
      </Button>

    </Box>
  );
}
