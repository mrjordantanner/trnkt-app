/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collection } from '../models/collection';
import { Box, Card, CardContent, ButtonBase, Typography } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
import { useNftService } from '../contexts/NftServiceContext';

interface Props {
  collection: Collection;

}

export default function CollectionCard({ collection }: Props) {

  const { selectedCollection, setCollection, setSelectedAsset, nftLimit, nextNftCursor } = useAssetContext();
  const navigate = useNavigate();
  const nftService = useNftService();

  if (!collection || !collection.image_url) {
    return null;
  }

  const onClickCollection = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCollection(collection);
    setSelectedAsset(null);
    nftService.fetchNfts(collection.collection, nftLimit, nextNftCursor);
    navigate('/explore');
  };

  function stripQueryParameters(url: string): string {
    const indexOfQuestionMark = url?.indexOf('?');
    if (indexOfQuestionMark === -1) {
        return url; // Return the original URL if no query parameters are found
    }
    
    return url ? url.substring(0, indexOfQuestionMark) : '';
  }

  const cardStyle = {
    display: 'flex', 
    height: '375px', 
    margin: '16px', 
    borderRadius: '20px',
    position: 'relative'
  }  

  const buttonBaseStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3,
  };

  const contentStyle = {
    position: 'relative', 
    zIndex: 2,
    width: '100%',
    border: '2px solid blue',
    padding: '8px',
    borderRadius: '20px',
  };
 
  return (
    <Card sx={cardStyle}>
      <ButtonBase onClick={onClickCollection} sx={buttonBaseStyle} />
      <CardContent sx={contentStyle}>
        <Typography sx={{ color: 'black' }}>
          {collection ? collection.name : 'Undefined'}
        </Typography>
        <img
          src={stripQueryParameters(collection.image_url)}
          alt={collection.name}
          style={{ width: '100%', objectFit: 'cover', borderRadius: '20px' }}
        />
      </CardContent>
    </Card>

	);
}
