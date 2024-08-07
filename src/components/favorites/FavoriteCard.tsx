/* eslint-disable @typescript-eslint/no-unused-vars */
//import { Link } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NftModel } from '../../models/nftModel';
import { Box, ButtonBase, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useAssetContext } from '../../contexts/AssetContext';
import { useNftService } from '../../contexts/NftServiceContext';
import ObjectViewer from '../utils/ObjectViewer';

interface Props {
  asset: NftModel;
}

export default function FavoriteCard({ asset }: Props) {
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
  };

  // const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   console.log(`Right-clicked asset: ${asset.name}`)
  // };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
	event.stopPropagation();

  };
  
  return (
		<Box>
			<ButtonBase
				className='favorite-card'
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

					</Box>
				</Box>
			</ButtonBase>
			<Box>
				<IconButton onClick={handleRemove} aria-label='remove'>
					<DeleteIcon className='icon' />
				</IconButton>
			</Box>
		</Box>
	);
}