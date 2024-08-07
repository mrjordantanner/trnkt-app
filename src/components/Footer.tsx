import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer () {

  return (
    <Box className='footer flex-column-center' 
    sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Typography className='p'>
            Powered by{' '}
            <a
                href='https://opensea.io/'
                target='_blank'
                rel='noopener noreferrer'>
                Opensea.io
            </a>
        </Typography>
        <Typography className='p'>
            Built by{' '}
            <a
                href='https://jordansmithdigital.com'
                target='_blank'
                rel='noopener noreferrer'>
                Jordan Smith Digital
            </a>
        </Typography>
    </Box>
  );



}