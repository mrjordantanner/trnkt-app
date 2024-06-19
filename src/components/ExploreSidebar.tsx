import React from 'react';
import { Box,Typography } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
//import { Nft } from '../models/nft';
import LinkifyText from './LinkifyText';
//import clsx from 'clsx';   // utility that helps you conditionally join class names together

// interface Option {
//   label: string;
//   value: string;
// }

// const collectionOptions: Option[] = [
//   { label: 'Parallel on Base', value: 'parallel-on-base' },
//   { label: 'New Dimension Huemin', value: 'new-dimension-huemin' },
//   { label: 'Clone X', value: 'clonex' },
//   { label: 'daily.xyz', value: 'daily-xyz' },
//   { label: 'BYOPill', value: 'byopill' },
// ];

// const getOption = (selectedCollection: string): Option | undefined => {
//     return collectionOptions.find(option => option.value === selectedCollection);
//   };

// Provide search and filtering options for NFT exploration
export default function ExploreSidebar() {

  const { 
    //nftLimit, 
    //setNftLimit, 
    selectedCollection, 
    //setCollection 
  } = useAssetContext();

    // useEffect(() => {
    //     if (selectedCollection) {
    //       const matchedOption = collectionOptions.find(option => option.label === selectedCollection.collection);
    //       if (matchedOption) { 
    //         setCollection(matchedOption.value);
    //       }
    //     }
    //   }, [selectedCollection, setCollection]);

  // const handleCollectionChange = (event: React.SyntheticEvent, newValue: Option | null) => {
  //   if (newValue) {
  //     setCollection(newValue.value);
  //   } 
  // };

  const contentsStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '50vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: '50px',
    backgroundColor: '#232323',
  }

  // const onButtonClick = () => {
  //   getNftBatch();
  // }

  // const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(event.target.value, 10);
  //   if (value >= 1 && value <= 200) {
  //     setNftLimit(value);
  //   }
  // };

  const sidebarStyle = {
    display: 'flex',
    width: '20vw',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1b1b1b'
  }
 
  return (

		<Box className="full-height-minus-navbar" sx={sidebarStyle} >
      
			<Box sx={contentsStyle}>

      <Typography variant="h4">{selectedCollection?.name}</Typography>
      {selectedCollection && 
        <LinkifyText style={{ width: '80%', marginTop: '20px' }} text={selectedCollection.description}></LinkifyText>}

        {/* <Box>
        <Typography>Select NFT Collection</Typography>
				<Autocomplete
          value={getOption(selectedCollection)}
					options={collectionOptions}
					getOptionLabel={(option: Option) => option.label}
					onChange={handleCollectionChange}
					sx={{ width: 300, backgroundColor: 'white' }}
					renderInput={(params) => <TextField {...params} label='Collection' />}
          />
          </Box> */}


        {/* <Box>
          <Typography>NFT Limit 1-200 (Default = 50)</Typography>
          <TextField
            sx={{ backgroundColor: 'white', width: '300px' }}
            type="number"
            label="NFT Batch Size Limit"
            value={nftLimit}
            onChange={handleLimitChange}
            inputProps={{ min: 1, max: 200 }}
          />
        </Box> */}

        {/* <Button
            // className={clsx('button', { 'button-primary': isPrimary })}
            className='button'
            sx={{ fontSize: '1rem', fontWeight: 'bold', border: '1px solid gray', backgroundColor: 'lightgray', width: '200px' }}
            onClick={onButtonClick}>
            Get NFTs
        </Button> */}

        
			</Box>
		</Box>
	);
}
