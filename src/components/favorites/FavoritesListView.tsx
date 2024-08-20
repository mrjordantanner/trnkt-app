import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { NftModel } from '../../models/nftModel';
import { FavoritesList } from '../../models/favorites';
import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';
import { useUserService } from '../../contexts/UserServiceContext';
import FavoriteCard from './FavoriteCard';

interface Props {
  favoritesList: FavoritesList;
  handleDeleteList: (listIdToDelete: string) => void;
}

export default function FavoritesListView({ favoritesList, handleDeleteList }: Props) {
  const { currentUser } = useUserService();
  const { deleteNftFromFavoritesList } = useFavoritesContext();
  const [isExpanded, setExpanded] = useState(false);
  const [nfts, setNfts] = useState<NftModel[]>(favoritesList.nfts);

  useEffect(() => {
    setNfts(favoritesList.nfts);
  }, [favoritesList]);

  // // TODO Implement edit list name functionality
  // const handleEdit = () => {
  //   console.log('TODO: Edit list:', favoritesList.listId);
  // };

  const handleRemoveFavorite = (event: React.MouseEvent<HTMLButtonElement>, asset: { identifier: string }) => {
    event.stopPropagation();
    if (currentUser && asset) {
      deleteNftFromFavoritesList(currentUser.userId, favoritesList.listId, asset.identifier)
        .then(() => {
          // Update local state to remove the NFT from the list
          setNfts(prevNfts => prevNfts.filter(nft => nft.identifier !== asset.identifier));
        })
        .catch(error => {
          console.error(`Error removing NFT ${asset.identifier} from FavoritesList ${favoritesList.listId}`, error);
        });
    } else {
      console.error(`FavoritesListView:  Error removing NFT ${asset.identifier} from FavoritesList ${favoritesList.listId}`);
    }
  };

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
          <strong>{favoritesList.name}</strong> [{nfts.length}]
        </Typography>
        {/* <IconButton onClick={handleEdit} aria-label="edit">
          <EditIcon className='icon'  />
        </IconButton> */}
        <IconButton onClick={() => handleDeleteList(favoritesList.listId)} aria-label="delete">
          <DeleteIcon className='icon'  />
        </IconButton>
      </Box>

      {isExpanded && 
        <Box className="scrollbar favorites-grid">
          {nfts.map((nft, index) => (
            <FavoriteCard asset={nft} key={index} handleRemoveFavorite={handleRemoveFavorite}/>
          ))}
        </Box>
      }
    </Box>
  );
}