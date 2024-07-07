import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: '#353535',
    border: '1px solid cyan',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
    maxHeight: '90%'
  };

const ObjectViewer: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ pr: 2, pl: 2 }}>
      <Button variant="outlined" onClick={handleOpen} >
        Properties
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="scrollbar" sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ color: 'cyan', fontWeight: 600 }}>
            Object Properties
          </Typography>
          <Box id="modal-description" sx={{ mt: 2 }}>
            {Object.entries(data).map(([key, value]) => (
              <Typography key={key}>
                <strong>{key}:</strong> {JSON.stringify(value)}
              </Typography>
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ObjectViewer;
