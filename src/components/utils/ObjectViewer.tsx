import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

const ObjectViewer: React.FC<Props> = ({ data }) => {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ pr: 2, pl: 2 }}>

      <Button variant="outlined" onClick={handleOpen} sx={{ minWidth: '115px' }}>
        Raw Data
      </Button>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="scrollbar properties-modal">
          <Typography id="modal-title" variant="h6" component="h2" sx={{ color: 'cyan', fontWeight: 600 }}>
            Raw Asset Data
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
