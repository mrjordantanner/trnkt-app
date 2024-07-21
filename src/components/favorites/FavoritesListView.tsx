import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FavoritesList } from '../../models/favorites';
import HorizontalScroll from '../HorizontalScroll';
// import { useUserService } from '../../contexts/UserServiceContext';
// import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';


interface Props {
  favoritesList: FavoritesList;
}

export default function FavoritesListView({ favoritesList }: Props) {


  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit list:', favoritesList.listId);
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete list:', favoritesList.listId);
  };

  const listViewContainerStyle = {
    mb: 4, 
    bgcolor: 'darkslateblue', 
    width: '80%',
    border: '1px solid magenta',
    borderRadius: '10px',
    p: 1
  }


  return (
    <Box sx={listViewContainerStyle}>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>


        <Typography variant="h6" sx={{ flex: 1, ml: 1 }}>
          {favoritesList.name}  [{favoritesList.nfts.length}]
        </Typography>
        <IconButton onClick={handleEdit} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>

      <HorizontalScroll nfts={favoritesList.nfts} />

    </Box>
  );
}
