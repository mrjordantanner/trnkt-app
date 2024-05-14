//import { Link } from 'react-router-dom';
import { NFT } from '../models/nft';

interface Props {
  asset: NFT;
}

export default function Card({ asset }: Props) {
  if (!asset) {
    return null;
  }

  return (
    <div className="card">
      <div className="blur-bg"></div>
      <a href={`/asset/${asset.contract}/${asset.id}`} className="link">
        <div className="image">
          <img src={asset.image_url} alt={asset.name} />
        </div>
        <div className="details">
          <h2 className="name">{asset.name}</h2>
          <p className="username">{asset.creator}</p>
          <p className="id">{asset.id}</p>
        </div>
      </a>
    </div>
  );
}
