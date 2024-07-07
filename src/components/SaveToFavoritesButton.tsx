import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import FavoritesModal from './favorites/FavoritesModal';

export default function SaveToFavoritesButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button 
      variant='contained' 
      color='primary' 
      sx={{ height: '36px', lineHeight: '1.25', fontSize: '12px' }}
      // className="favorites-button add" 
      onClick={handleShowModal}>
        Save as Favorite
      </Button>
      <FavoritesModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
