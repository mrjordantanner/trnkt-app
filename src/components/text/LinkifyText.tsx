import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  text: string;
  style?: React.CSSProperties;
}

export default function LinkifyText({ text, style }: Props) {

  const urlPattern = /https?:\/\/[^\s]+/g;
  const parts = text?.split(urlPattern);
  const urls = text?.match(urlPattern);

  return (
    <Typography className='linkify-text' style={{ whiteSpace: 'pre-wrap', ...style }}>
      {parts && parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {urls && urls[index] && (
            <a href={urls[index]} target="_blank" rel="noopener noreferrer">
              {urls[index]}
            </a>
          )}
        </React.Fragment>
      ))}
    </Typography>
  );
}
