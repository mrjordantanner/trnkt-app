import React, { useEffect, useState } from 'react';
import FavoritesListView from './FavoritesListView';
import SectionHeader from '../SectionHeader';
import { Box, Typography, Button } from '@mui/material';
import { useUserService } from '../../contexts/UserServiceContext';
import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';
import GemIcon from '../../images/Gem-1.png';
import { useNavigate } from 'react-router-dom';
import CustomDialog from '../utils/CustomDialog';

export default function FavoritesView() {
    const { currentUser, isAuthenticated } = useUserService();
    const { getUserFavorites, createNewFavoritesList, setFavoritesLists, favoritesLists, deleteFavoritesList } = useFavoritesContext();
    const navigate = useNavigate();

    // Delete FavoritesList confirmation dialog
	// TODO this is redudant as it also exists in FavoritesModal.  Consolidate to a context?
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteDialogTitle, setDeleteDialogTitle] = useState('');
    const [deleteDialogMessage, setDeleteDialogMessage] = useState('');
    const [selectedListId, setSelectedListId] = useState('');

    const listContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '85%',
        height: '100%',
        pt: 5,
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            if (isAuthenticated && currentUser) {
                const fetchedFavorites = await getUserFavorites(currentUser.userId);
                setFavoritesLists(fetchedFavorites?.favorites || []);
            } else {
                clearFavoritesView();
                console.log(
                    "FavoritesView: Couldn't get UserFavorites because not Authenticated or CurrentUser was null"
                );
            }
        };
        fetchFavorites();
    }, [currentUser, isAuthenticated]);

    const handleCreateNewList = async () => {
        if (isAuthenticated) {
            await createNewFavoritesList('');
        } else {
            navigate('/user/login');
        }
    };

    const clearFavoritesView = () => {
        setFavoritesLists([]);
    };

    const handleClickDeleteList = (listId: string, listName: string) => {
        setSelectedListId(listId);
        setDeleteDialogTitle(`Delete Favorites Set "${listName}"?`);
        setDeleteDialogMessage(`Are you sure you want to delete the Favorites Set "${listName}"? This action cannot be undone.`);
        setIsDeleteDialogOpen(true);
    };

    const onDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
    };

    const onDeleteDialogConfirm = async () => {
        await deleteFavoritesList(selectedListId);
        setIsDeleteDialogOpen(false);
    };

    return (
        <Box className='full-height-minus-bars'>
            <Box className='container'>
                <Box className='full-height-background flex-column-center scrollbar'>
                    <SectionHeader title='Favorite Sets' imgSrc={GemIcon} />

                    <CustomDialog
                        isOpen={isDeleteDialogOpen}
                        title={deleteDialogTitle}
                        message={deleteDialogMessage}
						confirmButtonText={'Yes'}
						cancelButtonText={'No'}
                        onClose={onDeleteDialogClose}
                        onConfirm={onDeleteDialogConfirm}
                    />

                    <Box sx={listContainerStyle}>
                        {favoritesLists.length > 0 ? (
                            favoritesLists.map((list) => (
                                <FavoritesListView
                                    key={list.listId}
                                    favoritesList={list}
                                    handleDeleteList={() => handleClickDeleteList(list.listId, list.name)}
                                />
                            ))
                        ) : (
                            <Box sx={{ width: '100%', height: '100%' }} className='panel'>
                                <Box
                                    className='flex-column-center'
                                    sx={{ height: '100%', justifyContent: 'center' }}>
                                    <Typography
                                        sx={{ fontSize: '1.25rem', p: 2 }}
                                        className='flex-center'>
                                        You currently have no Favorite Sets.
                                    </Typography>
                                    <Button variant='contained' onClick={handleCreateNewList}>
                                        Create New Set
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
