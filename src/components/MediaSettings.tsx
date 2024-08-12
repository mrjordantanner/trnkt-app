import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';
import { Box, Button, Typography } from '@mui/material';

export default function MediaSettings() {

  const { shouldFillMedia, setShouldFillMedia } = useSettingsContext();

  const handleToggleClass = () => {
    setShouldFillMedia(prevState => !prevState);
  };

  return (
    <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '175px', 
      ml: 5,
      //border: '1px solid gray',
      }}>

      <Typography className='toolbar-label flex-center'>Style:</Typography>

      <Button 
      className='toolbar-button'
      //variant={shouldFillMedia ? 'contained' : 'outlined'}
      variant='contained'
      onClick={handleToggleClass}>
        {shouldFillMedia ? 'Filled' : 'Contained'}
      </Button>

    </Box>
  );
}
