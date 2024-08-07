import React, { useState } from 'react';
import { Button } from '@mui/material';
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
      <Button className='add-to-favorites-button button'
        onClick={handleShowModal}
      >
        Save to Favorites
      </Button>
      <FavoritesModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
