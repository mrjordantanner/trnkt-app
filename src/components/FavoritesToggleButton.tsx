import React from 'react';
//import { Nft } from '../../models/nft';
import { Box, Button } from '@mui/material';


export default function FavoritesToggleButton () {
    
  //const [favoritesState, setFavoritesState] = useState<boolean>(false);

  // useEffect(() => {
  //   if (localFavorites) {
  //       const includesAsset = localFavorites.some(a => a?.identifier === asset?.identifier);
  //       setFavoritesState(includesAsset);
  //     }
  // }, [asset?.identifier, localFavorites]);

  // const handleAddToFavorites = () => {
  //   if (asset) {   
  //       addToFavorites(asset);
  //       setFavoritesState(true);
  //     }
  // };

  // const handleRemoveFromFavorites = () => {
  //   if (asset) {  
  //     removeFromFavorites(asset);
  //     setFavoritesState(false);
  //   }
  // };

  return (
    <Box className="button-container">
      {/* {favoritesState ? (
        <Button onClick={handleRemoveFromFavorites} className="favorites-button remove">
          Remove from Favorites
        </Button>
      ) : (
        <Button onClick={handleAddToFavorites} className="favorites-button add">
          Add to Favorites
        </Button>
      )} */}
        <Button className="favorites-button add">
          Save as Favorite
        </Button>
    </Box>
  );
}
