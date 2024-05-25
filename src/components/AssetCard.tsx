//import { Link } from 'react-router-dom';
import { Nft } from '../models/nft';
import { Box, Card, CardContent } from '@mui/material';

interface Props {
  asset: Nft;
  chain: string;

}

export default function AssetCard({ asset, chain }: Props) {
  
  if (!asset) {
    return null;
  }

  const assetPath = `/chain/${chain}/contract/${asset.contract}/nfts/${asset.identifier}`;

  return (
    <Card className="card">
      <CardContent>
      {/* <Box className="blur-bg"></Box> */}
      <a href={assetPath} className="link">
        <Box className="image">
          <img src={asset.image_url} alt={asset.name} />
        </Box>
        <Box className="details">
          <h2 className="name">{asset.name}</h2>
          <p className="username">Creator: {asset.creator}</p>
          <p className="id">ID: {asset.identifier}</p>
        </Box>
      </a>
      </CardContent>
    </Card>
  );
}
