import React, { useRef } from 'react';
import AssetCard from './AssetCard';
//import diamond from '../images/diamond.svg';
import Loading from './Loading';
import { Nft } from '../models/nft';
import { Box, Autocomplete, TextField } from '@mui/material';

interface Props {
  data: Nft[] | null;
  chain: string;
  setCollection: React.Dispatch<React.SetStateAction<string>>;
}

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: 'Parallel on Base', value: 'parallel-on-base' },
  { label: 'New Dimension Huemin', value: 'new-dimension-huemin' },
  { label: 'Clone X', value: 'clonex' },
];

export default function Gallery({ data, chain, setCollection }: Props) {

  const gallery = useRef<HTMLDivElement>(null);

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    newValue: Option | null
  ) => {
    if (newValue) {
      setCollection(newValue.value);
    } else {
      setCollection('');
    }
  };

  // const scrollToTop = () => {
  //   if (gallery.current) {
  //     gallery.current.scrollTo({
  //       top: 0,
  //       behavior: 'smooth',
  //     });
  //   }
  // };

  // After getting NFT data from the API, cache everything in local browser storage for now as JSON (eventually DynamoDB)
  // 

  if (!data) {
    return <Loading />;
  }

  return (
    <Box className="gallery-wrapper" ref={gallery}>
      <Box id="top"></Box>

      {/* <div className="gem-background-wrapper">
        <img className="gem-background invert" src={diamond} alt="diamond" />
      </div> */}

        <Box className="sidebar" sx={{backgroundColor: 'blue'}}>
          <Autocomplete
            options={options}
            getOptionLabel={(option: Option) => option.label}
            onChange={handleAutocompleteChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Choose a Collection" />}
          />
        </Box>

        <Box className="asset-grid">
          {data.map((asset: Nft) => (
            <AssetCard asset={asset} chain={chain} key={asset.identifier} />
          ))}
        </Box>

        {/* <footer className="footer red">
          <button className="button outline-secondary" onClick={scrollToTop}>
            Back to Top
          </button>
        </footer> */}

    </Box>
  );
}
