import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
import LinkifyText from './text/LinkifyText';
//import CollectionDropdown from './CollectionDropdown';

// TODO Export this
// interface MenuOption {
//   label: string;
//   value: string;
// }

// Provide search and filtering options for NFT exploration
export default function ExploreSidebar() {
  const { 
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
		</Box>
	);
}
