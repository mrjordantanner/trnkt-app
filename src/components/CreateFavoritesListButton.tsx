import React from 'react';
import { Box, Button, ButtonProps } from '@mui/material';
//import FavoritesModal from './favorites/FavoritesModal';

interface Props {
  style: React.CSSProperties;
  variant: ButtonProps['variant'];
  color: ButtonProps['color'];
  text: string;
  handleCreateNewList: () => void;
 }

export default function CreateFavoritesListButton({ style, variant, color, text, handleCreateNewList }: Props) {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleShowModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <Box>
      <Button
        variant={variant} 
        color={color} 
        sx={style}
        onClick={handleCreateNewList}
      >
        {text}
      </Button>
    </Box>
  );
}
