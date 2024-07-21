import React, { useEffect } from 'react';
import FavoritesListView from './FavoritesListView';
import { Box, Typography, Button } from '@mui/material';
import { useUserService } from '../../contexts/UserServiceContext';
import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';

export default function FavoritesView() {
  const { currentUser } = useUserService();
  const { getUserFavorites, userFavorites } = useFavoritesContext();

  const pageContainerStyle = {
    bgcolor: '#131313', 
    width: '100%',
    overflowY: 'scroll',
    justifyContent: 'center'
  }

  const listContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    padding: '16px',
    border: '1px solid magenta',
  }

  const addNewListButtonStyle = {
    borderRadius: '50%',
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      if (currentUser?.userId) {
        await getUserFavorites(currentUser.userId);
      } else {
        console.error("Couldn't get UserFavorites because CurrentUser/UserId was null");
      }
    };

    fetchFavorites();
  }, [currentUser]);

  const handleAddNewList = () => {
    
  }

  return (
    <Box className="full-height-plus-navbar scrollbar" sx={pageContainerStyle}>
      <Typography variant="h4" sx={{ padding: '16px' }}>
        F A V O R I T E S
      </Typography>
      <Button sx={addNewListButtonStyle} onClick={handleAddNewList}>+</Button>
      <Box sx={listContainerStyle}>
        {userFavorites?.favorites.map((list) => (
          <FavoritesListView key={list.listId} favoritesList={list} />
        ))}
      </Box>
    </Box>
  );
}