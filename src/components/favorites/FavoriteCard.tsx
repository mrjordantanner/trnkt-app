import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NftModel } from '../../models/nftModel';
import { Box, ButtonBase, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
//import { useUserService } from '../../contexts/UserServiceContext';
import { useAssetContext } from '../../contexts/AssetContext';
import { useNftService } from '../../contexts/NftServiceContext';
//import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';

interface Props {
  asset: NftModel;
  handleRemoveFavorite: (
    event: React.MouseEvent<HTMLButtonElement>,
    asset: NftModel
  ) => void;
}

export default function FavoriteCard({ asset, handleRemoveFavorite }: Props) {
  const navigate = useNavigate();
  //const { currentUser } = useUserService();
  const { setSelectedAsset } = useAssetContext();
  //const { deleteNftFromFavoritesList } = useFavoritesContext();
  const nftService = useNftService();

  if (!asset) {
    return null;
  }

  const onClickAsset = () => {
    setSelectedAsset(asset);
    nftService.fetchNft(asset);
    navigate(`/nfts/${asset.collection}/${asset.identifier}`);
  };

  return (
    <Box>
      <ButtonBase
        className="favorite-card"
        onClick={onClickAsset}
        sx={{ display: 'block' }} // Ensure full clickable area
      >
        <Box className="gradient-loading-animation"></Box>

        <Box
          className="nft-image"
          style={{
            backgroundImage: `url(${
              asset.displayImageUrl ? asset.displayImageUrl : asset.imageUrl
            })`,
          }}
        >
          <Box className="nft-name">{asset.name}</Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              position: 'absolute',
              bottom: '0px',
              justifyContent: 'flex-end',
            }}
          >
            <Box sx={{ opacity: '0.75', zIndex: '100' }}>
              <IconButton onClick={(event) => handleRemoveFavorite(event, asset)} aria-label="remove favorite">
                <DeleteIcon className="icon" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </ButtonBase>
    </Box>
  );
}
