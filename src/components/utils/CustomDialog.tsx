import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CustomDialog({
  open,
  title,
  message,
  confirmButtonText,
  cancelButtonText = "Cancel",
  onClose,
  onConfirm
}: Props) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {cancelButtonText}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
