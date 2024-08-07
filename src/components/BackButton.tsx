
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton }  from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    clearSelections: () => void;
}

export default function BackButton({ clearSelections }: Props){
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    clearSelections();
    if (location.state && (location.state as { from: string }).from) {
      navigate((location.state as { from: string }).from);
    } else {
      navigate(-1);
    }
  };

  return (
    <IconButton
      onClick={handleBack}>
      <ArrowBackIcon className='back-button'/>
    </IconButton>
  );
}