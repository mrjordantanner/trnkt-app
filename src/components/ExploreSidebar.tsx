import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
//import { NftModel } from '../models/nftModel';
import LinkifyText from './text/LinkifyText';
//import clsx from 'clsx';   // utility that helps you conditionally join class names together
//import CollectionDropdown from './CollectionDropdown';

// interface Props {
//   getNftBatch: () => Promise<{ nfts: NftModel[], next: string | null }>;
// }

// TODO Export this
// interface MenuOption {
//   label: string;
//   value: string;
// }

// Provide search and filtering options for NFT exploration
export default function ExploreSidebar() {
  const { 
    // nftLimit, 
    // setNftLimit,
    //setCollection,
    selectedCollection,

    // collectionMenuOptions,
    // getLocalCollectionBySlug
  } = useAssetContext();

  // useEffect(() => {
  //   if (selectedCollection) {
  //     const matchedOption = collectionMenuOptions?.find(option => option.label === selectedCollection.collection);
  //     if (matchedOption) { 
  //       const coll = getLocalCollectionBySlug(matchedOption.value);
  //       if (coll) {
  //         setCollection(coll);
  //       }
  //     }
  //   }
  // }, [selectedCollection, setCollection, collectionMenuOptions]);

  // const handleCollectionChange = (event: React.SyntheticEvent, newValue: MenuOption | null) => {
  //   if (newValue) {
  //     const coll = getLocalCollectionBySlug(newValue.value);
  //     if (coll) {
  //       setCollection(coll);
  //     }
  //   } 
  // };

  // const getMenuOption = (): MenuOption | undefined => {
  //   const coll = getLocalCollectionBySlug(newValue.value);
  //   return collectionMenuOptions?.find(option => option.value === coll);
  // };

  // const contentsStyle = {
  //   display: 'flex',
  //   flex: '1',
  //   flexDirection: 'column',
  //   height: '50vh',
  //   width: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'space-evenly',
  //   padding: '15px',
  //   border: '1px solid #232323',
  // }

  // // const onButtonClick = () => {
  // //   if (selectedCollection) {
  // //     getNftBatch();
  // //   }
  // // }

  // // const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // //   const value = parseInt(event.target.value, 10);
  // //   if (value >= 1 && value <= 200) {
  // //     setNftLimit(value);
  // //   }
  // // };

  // // const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  // //   if (event.key === 'Enter' || event.key === 'NumpadEnter') {
  // //     onButtonClick();
  // //   }
  // // };


 
  return (
    <Box className='sidebar explore-sidebar' >

        {/* COLLECTION INFO */}
        <Box sx={{ width: '100%' }}>
          <Typography className='collection-name-text'>{selectedCollection?.name}</Typography>
        </Box>
        
        <Box className="description-container panel">
          {selectedCollection && 
            <LinkifyText style={{ marginTop: '20px' }} text={selectedCollection.description}></LinkifyText>}
        </Box>  

        {/* <Box>
        <Typography>Select NFT Collection</Typography>
        <CollectionDropdown 
        handleCollectionChange={handleCollectionChange}
        getMenuOption={getMenuOption}
        />
        </Box> */}


        {/* FILTERS & CONTROLS */}
        {/* <Box className='controls-container' >

          <p style={{ padding: '5px', marginLeft: '5px' }}>NFT Batch Size <i>(Max: 200)</i></p>

          <Box sx={{ display: 'flex' }}>

            <TextField
              sx={{ backgroundColor: 'white', width: '50%', flex: 1, height: '50px' }}
              type="number"
              label=""
              className='text-field'
              value={nftLimit}
              onChange={handleLimitChange}
              onKeyDown={handleKeyDown}
              inputProps={{ min: 1, max: 200, default: 50 }}
            />

            <Button
                variant='contained'
                className='button'
                sx={{ flex: 1.5 }}
                onClick={onButtonClick}>
                Get NFTs
            </Button>

          </Box>
        </Box> */}

		</Box>
	);
}
