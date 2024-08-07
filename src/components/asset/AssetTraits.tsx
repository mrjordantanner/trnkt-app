import { NftModel, Trait } from '../../models/nftModel'
import { List, ListItem, Typography, Box } from '@mui/material';

interface Props {
  asset: NftModel;
}

const containerStyle = {
  padding: '1rem',
  height: '100vh',
  width: '100%',
  minWidth: '30vw',
  marginTop: '30px',
}

export default function AssetTraits ({ asset }: Props) {
  if (!asset?.traits) {
    return <li><h3>No embedded traits.</h3></li>;
  }

  return (
    <Box className="panel" sx={containerStyle}>
      <Typography className='panel-header'>
        Traits
      </Typography>

      {asset.traits.length > 0 ? (
        <List className='asset-trait-list'>
          {asset.traits.map((trait: Trait, index: number) => {
            return trait ? (
              <ListItem className='asset-trait-text'
                key={`${asset.identifier}-${index}`}>
                {trait.traitType}: {trait.value}
              </ListItem>
            ) : null
          })}
        </List>
      ) : (
        <Typography sx={{ p: 2 }}>No traits.</Typography>
      )}
    </Box>
  );
}
