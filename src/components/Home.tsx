import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import diamond from '../images/diamond.svg';
import { useUserService } from '../contexts/UserServiceContext';

export default function Home () {
  const { isAuthenticated } = useUserService();

  return (
		<Box className='home-container'>
			<img
				className='gem'
				src={diamond}
				alt='diamond'
			/>
			<Box className='logo text-outline'>TRNKT</Box>
			<Box className='subtitle text-outline-thin'>Crypto Artwork Explorer</Box>
			<Typography className='description'>
				Discover a wide variety of crypto artwork. Use the Explore button to
				display random Nft's from the Opensea API, click or tap to view them in
				detail, and save to a Favorites list for later viewing. <br></br>
			</Typography>

			{isAuthenticated ? (
				<Link to='/collections'>
					<Button
						className='button outline-secondary enter'
						sx={{
							fontSize: '1.25rem',
							fontWeight: 'bold',
							width: '300px',
							height: '70px',
							border: '2px solid white',
							display: 'flex',
						}}>
						E X P L O R E
					</Button>
				</Link>
			) : (
				<Link to='/login'>
					<Button variant="contained" className='button enter outline-secondary'>
						L O G   I N
					</Button>
				</Link>
			)}

			{/* <footer className='fixed-footer'>
				<p>
					Powered by{' '}
					<a
						href='https://opensea.io/'
						target='_blank'
						rel='noopener noreferrer'>
						<strong>Opensea.io</strong>
					</a>
				</p>
				<p>
					Built with love by{' '}
					<a
						href='https://jordansmithdigital.com'
						target='_blank'
						rel='noopener noreferrer'>
						<strong>Jordan Smith Digital</strong>
					</a>
				</p>
			</footer> */}
		</Box>
	);
}
