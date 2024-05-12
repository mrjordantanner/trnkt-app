//import { Link } from 'react-router-dom';
import { Asset } from '../models/asset';

interface Props {
  asset: Asset;
}

export default function Card({ asset }: Props) {
  if (!asset) {
    return null;
  }

  return (
    <div className="card">
      <div className="blur-bg"></div>
      {/* <Link to={`/asset/${asset.contractAddress}/${asset.tokenID}`} className="link">
        <div className="image">
          <img src={asset.imgUrl} alt={asset.name} />
        </div>
        <div className="details">
          <h2 className="name">{asset.name}</h2>
          <p className="username">{asset.creator}</p>
          <p className="id">{asset.id}</p>
        </div>
      </Link> */}
    </div>
  );
}
