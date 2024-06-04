import { Nft, Trait } from '../../models/nft'

interface Props {
  asset: Nft;
}

export default function AssetTraits ({ asset }: Props) {
  if (!asset?.traits) {
    return <li><h3>No embedded traits.</h3></li>;
  }

  return (
    <>
      <h2>Traits</h2>
      <ul className='traits-list'>
        {asset.traits.map((trait: Trait, index: number) => {
          return trait ? (
            <li key={`${asset.identifier}-${index}`}>
              {trait.trait_type}: {trait.value}
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
}
