import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import diamond from '../images/diamond.svg';
import { useUserService } from '../contexts/UserServiceContext';
import Footer from '../components/Footer';

export default function Home () {
  const { isAuthenticated } = useUserService();

  useEffect(() => {

  }), [];

  return (
		<Box className='home-container flex-column-center flex-center'>
			<img className='gem' src={diamond} alt='diamond' />

			<Box className='content flex-column-center'>
				<Box className='flex-column-center'>
					{/* <Box sx={{ position:'absolute', display: 'flex', width: '100vmin', height: '100vmin', bgcolor: 'yellow', justifyContent: 'center', alignItems: 'center' }} >
							<Typography sx={{ position: 'absolute' }} className='logo text-outline glitch-element-1 stroke-red opacity-25'>TRNKT</Typography>
							<Typography sx={{ position: 'absolute' }} className='logo text-outline glitch-element-2 stroke-blue opacity-25'>TRNKT</Typography>
							<Typography sx={{ position: 'absolute' }} className='logo text-outline opacity-50'>TRNKT</Typography>
					</Box> */}

					{/* <Typography variant='h3' className='subtitle'>
					Be inspired by the strange & beautiful world of crypto artwork.
					</Typography> */}
				</Box>

				{/* <Typography className='description'>
					Browse Featured Collections of NFT art pieces or venture off on your own by exploring Randomized galleries. <br /><br />
					Click or tap to view artwork in
					detail, and save favorites to Favorite Sets for later enjoyment. <br />
				</Typography> */}

				<Box
					className='flex-column-center'
					sx={{
						pt: 25,
						width: '100vw',
						height: '80vh',
						alignItems: 'space-between',
					}}>
					<Box sx={{ display: 'flex', width: '100vw', height: '100%' }}>
						<Typography
							sx={{ position: 'absolute' }}
							className='logo text-outline glitch-element-1 stroke-red opacity-25'>
							TRNKT
						</Typography>
						<Typography
							sx={{ position: 'absolute' }}
							className='logo text-outline glitch-element-2 stroke-blue opacity-25'>
							TRNKT
						</Typography>
						<Typography
							sx={{ position: 'absolute' }}
							className='logo text-outline opacity-50'>
							TRNKT
						</Typography>
					</Box>

					<Box sx={{ display: 'flex' }}>
						{isAuthenticated ? (
							<Link to='/nfts/collections/featured'>
								<Button
									sx={{ width: '350px' }}
									variant='contained'
									color='secondary'
									className='enter-button'>
									E X P L O R E
								</Button>
							</Link>
						) : (
							<Link to='/user/login'>
								<Button
									sx={{ width: '350px' }}
									variant='contained'
									color='secondary'
									className='enter-button'>
									SIGN IN
								</Button>
							</Link>
						)}
					</Box>
				</Box>
			</Box>

			<Footer />
		</Box>
	);
}
