import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import FavoritesModal from '../components/FavoritesModal';

export default function SaveToFavoritesButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box className="button-container">
      <Button 
      variant='contained' 
      color='primary' 
      // className="favorites-button add" 
      onClick={handleShowModal}>
        Save as Favorite
      </Button>
      <FavoritesModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
}
