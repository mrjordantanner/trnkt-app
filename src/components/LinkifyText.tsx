import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  text: string;
}

export default function LinkifyText({ text }: Props) {

  const textStyle = {
    fontSize : '1rem',
    lineHeight: '1.5rem',
    color: 'lightgray',
    padding: '1rem',
    width: '100%',
    textAlign: 'left',
    wordWrap: 'break-word'
  }

  const urlPattern = /https?:\/\/[^\s]+/g;
  const parts = text.split(urlPattern);
  const urls = text.match(urlPattern);

  return (
    <Typography sx={textStyle}>
      {parts.map((part, index) => (
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
