/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collection } from '../models/collection';
import { Box, Card, CardContent, Button, Typography } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';

interface Props {
  collection: Collection;

}

export default function CollectionCard({ collection }: Props) {

  const { selectedCollection, setCollection, fetchNfts, nftLimit, nextNftCursor } = useAssetContext();
  const navigate = useNavigate();

  if (!collection || !collection.image_url) {
    return null;
  }

  const onClickCollection = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCollection(collection.collection);
    fetchNfts(collection.collection, nftLimit, nextNftCursor);
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
    width: "80%", 
    height: '200px', 
    //objectFit: 'cover', 
    margin: '16px', 
    border: '1px solid red',
    borderRadius: '20px'
  }  

  const buttonStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundColor: 'chartreuse',
    opacity: '0.1',
  }
  
  return (
		<Card sx={cardStyle}>
			<CardContent
				sx={{
					width: '100%',
					border: '2px solid blue',
					padding: '8px',
					borderRadius: '20px',
				}}>

				<Button sx={buttonStyle} onClick={onClickCollection} />

				<Typography sx={{ color: 'black' }}>
					{collection ? collection.name : 'Undefined'}
				</Typography>

				<img
					src={stripQueryParameters(collection.image_url)}
					alt={collection.name}
					style={{ width: '100%', objectFit: 'cover' }}
				/>
			</CardContent>
		</Card>
	);
}
