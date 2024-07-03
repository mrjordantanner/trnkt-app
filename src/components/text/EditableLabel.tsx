import React, { useState, ChangeEvent, ReactNode } from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  initialValue: string | undefined;
  onSave: (newValue: string) => void;
  children: ReactNode;
}

export default function EditableLabel({ initialValue, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setIsEditing(false);
    if (value && value !== initialValue) {
      onSave(value);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(initialValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return (
    <div>
      {isEditing ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={value}
            onChange={handleChange}
            size="small"
            variant="outlined"
            autoFocus
          />
          <IconButton onClick={handleSave}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', border: '1px solid gray', width: '250px' }}>
          <Typography variant="h6">{value}</Typography>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </div>
  );
}
