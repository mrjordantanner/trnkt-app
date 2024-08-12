import React, { useEffect } from 'react';
import FavoritesListView from './FavoritesListView';
import SectionHeader from '../SectionHeader';
import { Box, Typography, Button } from '@mui/material';
import { useUserService } from '../../contexts/UserServiceContext';
import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';
import GemIcon from '../../images/Gem-1.png';
//import CreateFavoritesListButton from '../CreateFavoritesListButton';
//import { FavoritesList } from '../../models/favorites';

export default function FavoritesView() {
	const { currentUser } = useUserService();
	const { getUserFavorites, userFavorites, createNewFavoritesList } =
		useFavoritesContext();

	const listContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		minHeight: '85%',
		height: '100%',
		pt: 5,
	};

	// const addNewListButtonStyle = {
	// 	width: '60px',
	// 	height: '60px',
	// 	minWidth: '60px',
	// 	borderRadius: '50%',
	// 	fontSize: '3rem',
	// 	fontWeight: '900',
	// 	bgcolor: '#232323',
	// 	display: 'flex',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	p: 0,
	// 	mr: 10,
	// };

	useEffect(() => {
		const fetchFavorites = async () => {
			if (currentUser?.userId) {
				await getUserFavorites(currentUser.userId);
			} else {
				console.error(
					"Couldn't get UserFavorites because CurrentUser/UserId was null"
				);
			}
		};

		fetchFavorites();
	}, [currentUser]);

	const handleCreateNewList = async () => {
		createNewFavoritesList('');
	};

	return (
		<Box className='full-height-minus-bars'>
			<Box className='container'>
				<Box
					className='full-height-background flex-column-center scrollbar'
					sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
					<Box
						sx={{
							//p: 1,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%',
							//border: '1px solid yellow',
						}}>
						<SectionHeader title='Favorite Sets' imgSrc={GemIcon} />

						{/* <Box>
							<CreateFavoritesListButton
								style={addNewListButtonStyle}
								color='secondary'
								variant='outlined'
								text={'+'}
								handleCreateNewList={handleCreateNewList}
							/>
						</Box> */}
					</Box>

					<Box sx={listContainerStyle}>
						{userFavorites ? (
							userFavorites.favorites.map((list) => (
								<FavoritesListView key={list.listId} favoritesList={list} />
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
