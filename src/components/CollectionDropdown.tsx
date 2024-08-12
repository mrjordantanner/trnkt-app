import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface CollectionDropdownProps {
  handleCollectionChange: (event: SelectChangeEvent<string>, newValue: string | null) => void;
  getMenuOption: () => string | undefined;
  options: { label: string, value: string }[] | undefined;
}

const CollectionDropdown: React.FC<CollectionDropdownProps> = ({ handleCollectionChange, getMenuOption, options }) => {
  const selectedValue = getMenuOption();

  return (
    <Box className='bg-dark'>
        <FormControl fullWidth size="small">
        <InputLabel sx={{ color: 'white' }}>NFT Collection</InputLabel>
        <Select
            sx={{ color: 'white', fontWeight: 'bold' }}
            value={selectedValue || ''}
            onChange={(event) => handleCollectionChange(event, event.target.value as string)}
            label="NFT Collection"
        >
            {options?.map((option) => (
            <MenuItem 
              key={option.value} value={option.value} 
              className='collection-menu-item'>
                {option.label}
            </MenuItem>
            ))}

        </Select>
        </FormControl>
    </Box>
  );
};

export default CollectionDropdown;
