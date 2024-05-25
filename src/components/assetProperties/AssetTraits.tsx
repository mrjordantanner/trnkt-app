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
      <div className='flex-row'><h3>Traits</h3></div>
      <ul className='traits-list'>
        {asset.traits.map((trait: Trait, index: number) => {
          return trait ? (
            <li key={`${trait.trait_type}-${asset.identifier}-${index}`}>{trait.trait_type}: {trait.value}</li>
          ) : null;
        })}
      </ul>
    </>
  );
}
