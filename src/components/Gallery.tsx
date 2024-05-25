import React, { useRef } from 'react';
import AssetCard from './AssetCard';
//import diamond from '../images/diamond.svg';
import Loading from './Loading';
import { Nft } from '../models/nft';
import { Box } from '@mui/material';

interface Props {
  data: Nft[] | null;
  chain: string;
}

export default function Gallery({ data, chain }: Props) {
  const gallery = useRef<HTMLDivElement>(null);

  // const scrollToTop = () => {
  //   if (gallery.current) {
  //     gallery.current.scrollTo({
  //       top: 0,
  //       behavior: 'smooth',
  //     });
  //   }
  // };

  // After getting NFT data from the API, cache everything in local browser storage for now as JSON (eventually DB)
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
