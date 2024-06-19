import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetContext } from '../contexts/AssetContext';
import { Box, Typography, Link, Button } from '@mui/material';
import { useUserService } from '../contexts/UserServiceContext';

const toolbarStyle = {
	display: 'flex',
    flexDirection: 'row',
	justifyContent: 'space-around',
	alignItems: 'center',
	height: '40px',
	width: '100%',
	borderBottom: '3px solid #121212',
	marginTop: '70px',
    //marginBottom: '-70px',
	//borderRadius: '8px',
	backgroundColor: '#232323',
};

const buttonStyle = {
	border: '1px solid white',
	backgroundColor: '#353535',
	color: 'white',
	margin: '10px',
	width: '80px',
	opacity: '0.5',
	zIndex: '5',
    height: '65%',
    borderRadius: '15px'
};

export default function Toolbar() {
	const { selectedAsset, selectedCollection, setSelectedAsset, setCollection } = useAssetContext();
    const navigate = useNavigate();

	const { isAuthenticated, currentUser } = useUserService();

	// useEffect(() => {

    // }, []);

	const onClickBackButton = () => {
        if (selectedAsset) {
            setSelectedAsset(null);
            return;
        }

        if (selectedCollection) {
            setCollection(null);
            navigate('/collections');
            return;
        }
	};

    let openseaUrl = '';
    if (selectedCollection) {
      if (selectedAsset) {
        openseaUrl = selectedAsset.opensea_url;
      } else {
        openseaUrl = selectedCollection.opensea_url;
      }
    }

	return (
		<Box sx={toolbarStyle}>
			{(selectedCollection || selectedAsset) && (
				<Button sx={buttonStyle} onClick={onClickBackButton}>
					BACK
				</Button>
			)}

			{selectedCollection || selectedAsset ? (
				<Link
					className='detail-text'
					href={openseaUrl}
					sx={{ color: 'cyan', fontWeight: 'bold' }}
					target='_blank'
					rel='noopener noreferrer'>
					View on Opensea.io
				</Link>
			) : null}

			<Typography>Collection: {selectedCollection?.name}</Typography>
			<Typography>Asset: {selectedAsset?.name}</Typography>
			<Typography>IsAuth: {`${isAuthenticated}`}</Typography>
			<Typography>User: {currentUser?.userName}</Typography>
		</Box>
	);
}
