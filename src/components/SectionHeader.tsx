import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  imgSrc: string;
}

export default function SectionHeader({ title, imgSrc }: Props) {
  return (
    <Box className='section-header'>
        <Box className='section-header-icon'>
          <img
            src={imgSrc}
            alt='Section Icon'
          />
        </Box>

        <Typography className='section-header-text'>
          {title}
        </Typography>
    </Box>
  );
}
