import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { FavoritesList } from '../../models/favorites';
import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';
import { useUserService } from '../../contexts/UserServiceContext';
import FavoritesContainer from './FavoritesContainer';

interface Props {
  favoritesList: FavoritesList;
}

export default function FavoritesListView({ favoritesList }: Props) {
  const { currentUser } = useUserService();
  const { deleteFavoritesList } = useFavoritesContext();
  const [isExpanded, setExpanded] = useState(false);

  const handleEdit = () => {
    // TODO Implement edit functionality
    console.log('Edit list:', favoritesList.listId);
  };

  const handleDelete = () => {
    if (!currentUser) {
      console.error(`Error deleting FavoritesList ${favoritesList.listId}. CurrentUser is null.`);
      return;
    }
    deleteFavoritesList(currentUser.userId, favoritesList.listId);
  };

  // TODO save/load this setting from Local Storage
  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <Box className='favorites-list-view panel'>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
      <IconButton onClick={toggleExpand} aria-label={isExpanded ? "collapse" : "expand"} className='scale-150'>
          {isExpanded ? 
          <ExpandMoreIcon className='icon' /> : <ExpandLessIcon className='icon rotate-90' />}
        </IconButton>
        <Typography className='favorites-list-view-header'>
          <strong>{favoritesList.name}</strong> [{favoritesList.nfts.length}]
        </Typography>
        <IconButton onClick={handleEdit} aria-label="edit">
          <EditIcon className='icon'  />
        </IconButton>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon className='icon'  />
        </IconButton>

      </Box>
      {isExpanded && <FavoritesContainer nfts={favoritesList.nfts} />}
    </Box>
  );
}
