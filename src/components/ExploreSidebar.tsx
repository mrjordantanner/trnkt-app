import React, { useEffect } from 'react';
import { Box, Button, Autocomplete, TextField } from '@mui/material';
//import clsx from 'clsx';   // utility that helps you conditionally join class names together
//import diamond from '../images/diamond.svg';

interface Props {
  selectedCollection: string;
  setCollection: React.Dispatch<React.SetStateAction<string>>;
  fetchData: () => void;
}

interface Option {
  label: string;
  value: string;
}

const collectionOptions: Option[] = [
  { label: 'Parallel on Base', value: 'parallel-on-base' },
  { label: 'New Dimension Huemin', value: 'new-dimension-huemin' },
  { label: 'Clone X', value: 'clonex' },
  { label: 'Chronoforge', value: 'chronoforge' },
];

// Provide search and filtering options for NFT exploration
export default function ExploreSidebar({ selectedCollection, setCollection, fetchData }: Props) {

    useEffect(() => {
        if (selectedCollection) {
          const matchedOption = collectionOptions.find(option => option.label === selectedCollection);
          if (matchedOption) { 
            setCollection(matchedOption.value);
          }
        } else {
            setCollection('');
        }
      }, [selectedCollection, setCollection]);

  const handleCollectionChange = (event: React.SyntheticEvent, newValue: Option | null) => {
    if (newValue) {
      setCollection(newValue.value);
      //fetchData();
    } else {
      //setCollection('');
    }
  };

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    width: 500,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'gray',
  }

  const contentsStyle = {
    height: '50vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50px',
    backgroundColor: 'lightgray',
  }
 

  return (
		<Box sx={containerStyle}>
			<Box sx={contentsStyle}>
				<Autocomplete
                    //value={selectedCollection}
					options={collectionOptions}
					getOptionLabel={(option: Option) => option.label}
					onChange={handleCollectionChange}
					sx={{ width: 300, backgroundColor: 'white' }}
					renderInput={(params) => <TextField {...params} label='Collection' />}
				/>

                <Button
                    // className={clsx('button', { 'button-primary': isPrimary })}
                    className='button'
                    sx={{  }}
                    onClick={fetchData}>
                    Get NFTs
                </Button>
			</Box>
		</Box>
	);
}
