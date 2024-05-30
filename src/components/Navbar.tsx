import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, List, ListItem } from '@mui/material';

interface Props {
	randomizeOffset: () => void;
	//clearCollection: () => void;
}

// MASTER NAVBAR COMPONENT
// TODO conditionally render buttons, etc
export default function Navbar({ randomizeOffset }: Props) {
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
						className='button outline-secondary'
						component={RouterLink}
						to='/explore'
						onClick={randomizeOffset}>
						E X P L O R E
					</Button>
				</ListItem>
				<ListItem>
					<Button
						className='button outline-primary'
						component={RouterLink}
						to='/favorites'>
						F A V O R I T E S
					</Button>
				</ListItem>
			</List>
		</Box>
	);
}
