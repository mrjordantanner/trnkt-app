import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, List, ListItem } from '@mui/material';

interface Props {
	numberFavorites: number | undefined;
}

// MASTER NAVBAR COMPONENT
// TODO conditionally render buttons, etc
export default function Navbar({ numberFavorites }: Props) {
	return (
		<Box className='navbar-container'>
			<Box className='navbar-blur'></Box>
			<List>
				<ListItem>
					<Button className='nav-link' component={RouterLink} to='/'>
						TRNKT
					</Button>
				</ListItem>
				<ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-secondary'
						component={RouterLink}
						to='/collections'
						>
						C O L L E C T I O N S
					</Button>
				</ListItem>
				<ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-secondary'
						component={RouterLink}
						to='/explore'
						>
						E X P L O R E
					</Button>
				</ListItem>
				<ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-primary'
						component={RouterLink}
						to='/favorites'>
						F A V O R I T E S [ {numberFavorites} ]
					</Button>
				</ListItem>
			</List>
		</Box>
	);
}
