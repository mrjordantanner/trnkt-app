import React, { useState } from 'react';
import { Box, Dialog, DialogContent } from '@mui/material';
import { NftModel } from '../models/nftModel';
import { useSettingsContext } from '../contexts/SettingsContext';

interface Props {
  asset: NftModel | null;
}

export default function MediaComponent({ asset }: Props) {
  const { shouldFillMedia } = useSettingsContext();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className='asset-image-container'>
        {asset?.animationUrl ? (
          <video
            src={asset?.animationUrl}
            autoPlay
            loop
            muted
            controls
            className={shouldFillMedia ? 'cover' : 'contain'}
            style={{ height: '100%', cursor: 'pointer' }}
            //onClick={handleClickOpen}
          >
            Sorry, the video can't play in this browser.
          </video>
        ) : (
          <img
            src={asset?.imageUrl}
            alt={asset?.name}
            className={shouldFillMedia ? 'cover' : 'contain'}
            style={{ height: '100%', cursor: 'pointer' }}
            onClick={handleClickOpen}
          />
        )}
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogContent>
          {asset?.animationUrl ? (
            <video
              src={asset?.animationUrl}
              autoPlay
              loop
              muted
              controls
              style={{ width: '100%', height: '100%' }}
            >
              Sorry, the video can't play in this browser.
            </video>
          ) : (
            <img
              src={asset?.imageUrl}
              alt={asset?.name}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
