/* eslint-disable @typescript-eslint/no-unused-vars */
//import { Link } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NftModel } from '../../models/nftModel';
import { Box, ButtonBase, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { useAssetContext } from '../../contexts/AssetContext';
import { useNftService } from '../../contexts/NftServiceContext';
import ObjectViewer from '../utils/ObjectViewer';

interface Props {
  asset: NftModel;
}

export default function AssetCard({ asset }: Props) {
  const navigate = useNavigate();
  const { selectedAsset, setSelectedAsset } = useAssetContext();
  const nftService = useNftService();
  if (!asset) {
    return null;
  }

  const onClickAsset = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedAsset(asset);
    nftService.fetchNft(asset);
    navigate(`/nfts/${asset.collection}/${asset.identifier}`);

	// NOTE For 'smart linking' the back button
	// navigate(`/nfts/${asset.collection}/${asset.identifier}`, 
	// 	{ state: { from: '/current-page' } });
  };


  const handleAddToFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

      // TODO "Quick Add" Asset to Default Favorites list
    
  };
  
  return (
		<Box>
			<ButtonBase
				className='nft-card'
				onClick={onClickAsset}
				// onContextMenu={handleRightClick}
			>
				<Box className='gradient-loading-animation'></Box>

				<Box
					className='nft-image'
					style={{
						backgroundImage: `url(${
							asset.displayImageUrl ? asset.displayImageUrl : asset.imageUrl
						})`,
					}}>
					<Box className='nft-name'>
						{asset.name}
						{/* <IconButton onClick={handleAddToFavorites} aria-label='add'>
							<FavoriteIcon className='icon' />
						</IconButton> */}
					</Box>
				</Box>
			</ButtonBase>
		</Box>
	);
}