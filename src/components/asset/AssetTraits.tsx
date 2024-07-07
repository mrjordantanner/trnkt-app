import { Nft, Trait } from '../../models/nftDto'
import { List, ListItem, Typography, Box } from '@mui/material';

interface Props {
  asset: Nft;
}

const containerStyle = {
  padding: '1rem',
  height: '100vh',
  width: '100%',
  minWidth: '30vw',
  marginTop: '30px',
  border: '1px solid lightgray',
  bgcolor: 'purple'
}

const traitsListStyle = {
  color: 'white',
  padding: '0rem',
  margin: '0.5rem',
  fontSize: '1.25rem',
  fontWeight: '400'

}

export default function AssetTraits ({ asset }: Props) {
  if (!asset?.traits) {
    return <li><h3>No embedded traits.</h3></li>;
  }

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4">Traits</Typography>
      <List sx={{traitsListStyle}}>
        {asset.traits.map((trait: Trait, index: number) => {
          return trait ? (
            <ListItem key={`${asset.identifier}-${index}`}>
              {trait.trait_type}: {trait.value}
            </ListItem>
          ) : null;
        })}
      </List>
    </Box>
  );
}
