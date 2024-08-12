import React, { useState, useEffect } from 'react';
import {Box,Button,TextField,Typography,Checkbox,IconButton,List,ListItem,ListItemText,ListItemIcon,Modal} from '@mui/material';
import { Close, Delete as DeleteIcon, } from '@mui/icons-material';
//import { Nft } from '../models/nft';
import { UserFavorites } from '../../models/favorites';
import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';
import { useUserService } from '../../contexts/UserServiceContext';
import { useAssetContext } from '../../contexts/AssetContext';

interface Props {
	open: boolean;
	onClose: () => void;
}

export default function FavoritesModal({ open, onClose }: Props) {

	const [newListName, setNewListName] = useState<string>('');
	const [isCreatingNewList, setIsCreatingNewList] = useState<boolean>(false);
	const [checkboxStates, setCheckboxStates] = useState<{[key: string]: boolean;}>({});

	const { getUserFavorites, updateFavorites, favoritesLists, setFavoritesLists, createNewFavoritesList, deleteFavoritesList } = useFavoritesContext();
	const { currentUser } = useUserService();
	const { selectedAsset } = useAssetContext();

	useEffect(() => {
		getFavorites();
	}, []);

	const getFavorites = async () => {
		// Get FavoritesLists from backend
		if (currentUser) {
			if (!currentUser.userId) {
				console.error('currentUser.id was null');
				return null;
			}
			const userFavorites = await getUserFavorites(currentUser.userId);
			if (userFavorites) {
				setFavoritesLists(userFavorites.favorites);
				console.log(
					`Successfuly got UserFavorites for userId ${currentUser.userId} with ${favoritesLists.length} FavoritesLists`
				);

				if (selectedAsset) {
					const selectedAssetId = selectedAsset?.identifier;

					// Set each list's checkbox value based on whether or not it contains the current asset
					favoritesLists.forEach((list) => {
						const listContainsNft = list.nfts.some(
							(nft) => nft.identifier === selectedAssetId
						);
						setCheckboxState(list.listId, listContainsNft);
					});
				}
			} else {
				console.error('GetUserFavorites: UserFavorites was null');
			}
		}
	};

	const setCheckboxState = (listId: string, state: boolean) => {
		setCheckboxStates((prevState) => ({ ...prevState, [listId]: state }));
	};

	const handleStartCreate = () => {
		setIsCreatingNewList(true);
	};

	const handleCancelCreate = () => {
		setIsCreatingNewList(false);
		setNewListName('');
	};

	const handleOnClose = () => {

		// If user closes a modal after creating a new list but not saving the NFT,
		// it should still have created the list

		handleCancelCreate();
		onClose();
	}

	const handleCreateList = () => {
		if (newListName) {
			console.log(`Creating new list ${newListName}...`)
			createNewFavoritesList(newListName);
			setIsCreatingNewList(false);
			setNewListName('');
		} else {
			setIsCreatingNewList(false);
			console.log('Creating new list was aborted -- list name was blank.');
		}
	};

	const handleDeleteList = (listId: string) => {
		if (currentUser) {
			deleteFavoritesList(currentUser?.userId, listId);
		}
	}

	// Update Favorites
	const handleSave = async () => {
		if (selectedAsset && currentUser) {
			// Iterate through the local cache of favoritesLists and if each Checkbox is checked,
			// Add selectedAsset to the current favoritesList if it's not currently in that list
			const updatedLists = favoritesLists.map((list) => {
				const listIsChecked = checkboxStates[list.listId];
				if (listIsChecked) {
					const listContainsNft = list.nfts.some((nft) => nft.identifier === selectedAsset.identifier);
					if (!listContainsNft) {
						list.nfts.push(selectedAsset);
					}
					return list;
				}
				return list;
			});

			onClose();

			// Update Favorites STEP 1
			// Update the backend with the new UserFavorites object containing the updated Lists
			const updatedFavorites: UserFavorites | null = await updateFavorites(currentUser.userId, updatedLists);

            // Update Favorites STEP 9
			if (updatedFavorites) {
				console.log('Favorites updated successfully:');
				console.log(updatedFavorites.favorites);  
			} else {
				console.log('HandleSave: No updated UserFavorites were returned from the Save operation');
			}
		} else {
			console.error(
				'Error updating Favorites: currentUser or selectedAsset was null.'
			);
		}
	};

	const closeButtonStyle = {
		position: 'absolute',
		color: 'lightgray',
		top: 8,
		right: 8,
	};

	const buttonContainerStyle = {
		mt: 2,
		display: 'flex',
		justifyContent: 'space-between',
	};

	return (
		<Modal open={open} onClose={handleOnClose}>
			<Box className= 'favorites-lists-modal'>
				<IconButton sx={closeButtonStyle} onClick={handleOnClose}>
					<Close />
				</IconButton>
				<Typography variant='h6' sx={{ mb: 2 }}>
					Save to...
				</Typography>
				<List>
					{favoritesLists &&
						favoritesLists.map((list, index) => (
							<ListItem key={index}>
								<ListItemIcon>
									<Checkbox
										edge='start'
										sx={{ color: 'lightgray' }}
										checked={!!checkboxStates[list.listId]}
										onChange={(e) =>
											setCheckboxState(list.listId, e.target.checked)
										}
									/>
								</ListItemIcon>
								<ListItemText primary={list.name} />
								<IconButton onClick={() => handleDeleteList(list.listId)} aria-label="delete">
									<DeleteIcon className='icon'  />
								</IconButton>
							</ListItem>
						))}
				</List>
				{isCreatingNewList ? (
					<Box sx={{ mt: 2 }}>
						<TextField
							sx={{ bgcolor: 'lightgray', color: 'white' }}
							label='List Name'
							variant='outlined'
							value={newListName}
							onChange={(e) => setNewListName(e.target.value)}
							fullWidth
                            autoFocus
						/>
						<Box sx={buttonContainerStyle}>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleCreateList}>
								Create
							</Button>
							<Button
								variant='outlined'
								color='secondary'
								onClick={handleCancelCreate}>
								Cancel
							</Button>
						</Box>
					</Box>
				) : (
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<Button
							sx={{ mt: 2 }}
							variant='contained'
							color='secondary'
							onClick={handleSave}>
							S A V E
						</Button>
						<Button
							sx={{ mt: 2 }}
							variant='outlined'
							color='secondary'
							onClick={handleStartCreate}>
							New List
						</Button>
					</Box>
				)}
			</Box>
		</Modal>
	);
}
