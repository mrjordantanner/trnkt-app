import React, { useState, useEffect } from 'react';
import {Box,Button,TextField,Typography,Checkbox,IconButton,List,ListItem,ListItemText,ListItemIcon,Modal} from '@mui/material';
import { Close } from '@mui/icons-material';
//import { Nft } from '../models/nft';
import { FavoritesList, UserFavorites } from '../../models/favorites';
import { v4 as uuidv4 } from 'uuid';
import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';
import { useUserService } from '../../contexts/UserServiceContext';
import { useAssetContext } from '../../contexts/AssetContext';

interface Props {
	open: boolean;
	onClose: () => void;
}

export default function FavoritesModal({ open, onClose }: Props) {
	const defaultFavorites: FavoritesList[] = [
		{
			listId: 'Default-Favorites',
			name: 'Default Favorites',
			nfts: [],
		},
	];

	const [favoritesLists, setFavoritesLists] = useState<FavoritesList[]>(defaultFavorites);
	const [newListName, setNewListName] = useState<string>('');
	const [isCreatingNewList, setIsCreatingNewList] = useState<boolean>(false);
	const [checkboxStates, setCheckboxStates] = useState<{[key: string]: boolean;}>({});

	const { getUserFavorites, updateFavorites } = useFavoritesContext();
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
					`Successfuly got UserFavorites for userId ${currentUser.userId} with ${userFavorites.favorites.length} FavoritesLists`
				);

				if (selectedAsset) {
					const selectedAssetId = selectedAsset?.identifier;

					// Set each list's checkbox value based on whether or not it contains the current asset
					userFavorites.favorites.forEach((list) => {
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

	const handleCreateNewList = () => {
		setIsCreatingNewList(true);
	};

	const handleCancelCreate = () => {
		setIsCreatingNewList(false);
		setNewListName('');
	};

	const handleCreateList = () => {
		if (newListName) {
			const newList: FavoritesList = {
				//userId: currentUser?.id,
				listId: uuidv4(),
				name: newListName,
				nfts: [],
			};
			const newFavoritesLists = favoritesLists
				? [...favoritesLists, newList]
				: [newList];
			setFavoritesLists(newFavoritesLists);
			setIsCreatingNewList(false);
			setNewListName('');
        //handleSave(); // Instead of doing this...

      // Assuming the user checks the checkbox for the new list and clicks Save, all FavoritesLists (including the new one) will be updated and written to DynamoDb.
      // If they make a new list and don't add anything, meaning handleSave() doesn't get called,
      // will the new List persist in the state of the component if we navigate away and come back?
      // Upon clicking the Close button, or the modal otherwise closing, if we didn't save any new NFTs (meaning that handleSave() wasnt called) we need to save any new FavoritesLists that were created.

		}
	};

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

			// Update Favorites STEP 1 - we are clear up to here
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

	// const handleSave = async () => {
	// 	if (selectedAsset) {
	// 		const selectedAssetId = selectedAsset.identifier;

	// 		favoritesLists.forEach((list) => {
	// 			// If the FavoritesList checkbox value is true and currentAsset.identifier is not contained in the FavoritesList.nfts array yet, add it to that FavoritesList Nfts array
	// 			const listContainsNft = list.nfts.some(
	// 				(nft) => nft.identifier === selectedAssetId
	// 			);
	// 			const listIsChecked = checkboxStates[list.listId];

	// 			if (listIsChecked && !listContainsNft) {
	// 				list.nfts.push(selectedAsset);
	// 			}
	// 		});

	// 		// Update the backend with the new UserFavorites object containing the updated Lists
	// 		if (currentUser) {
	// 			try {
	// 				await updateFavorites(currentUser.id, favoritesLists);
	// 				console.log('Favorites updated successfully.');
	// 			} catch (error) {
	// 				console.error('Error updating favorites:', error);
	// 			}
	// 		} else {
	// 			console.error('Error updating Favorites: currentUser was null.');
	// 		}
	// 	} else {
	// 		console.error('Error updating Favorites: selectedAsset was null.');
	// 	}

	const modalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'black',
		opacity: '0.85',
		border: '1px solid lightgray',
		boxShadow: 24,
		p: 4,
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
		<Modal open={open} onClose={onClose}>
			<Box sx={modalStyle}>
				<IconButton sx={closeButtonStyle} onClick={onClose}>
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
								color='primary'
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
							color='primary'
							onClick={handleSave}>
							S A V E
						</Button>
						<Button
							sx={{ mt: 2 }}
							variant='outlined'
							color='secondary'
							onClick={handleCreateNewList}>
							New List
						</Button>
					</Box>
				)}
			</Box>
		</Modal>
	);
}
