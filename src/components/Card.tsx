//import { Link } from 'react-router-dom';
import { Nft } from '../models/nft';

interface Props {
  asset: Nft;
  chain: string;

}

export default function Card({ asset, chain }: Props) {
  if (!asset) {
    return null;
  }

  return (
    <div className="card">
      <div className="blur-bg"></div>
      <a href={`/chain/${chain}/contract/${asset.contract}/nfts/${asset.identifier}`} className="link">
        <div className="image">
          <img src={asset.image_url} alt={asset.name} />
        </div>
        <div className="details">
          <h2 className="name">{asset.name}</h2>
          <p className="username">Creator: {asset.creator}</p>
          <p className="id">ID: {asset.identifier}</p>
        </div>
      </a>
    </div>
  );
}
