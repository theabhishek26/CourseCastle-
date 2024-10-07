import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loader({showloader}) {
  return (
    <div className={'absolute'+(showloader?' flex':' hidden')}>
    <Box sx={{ width: '100vw' }}>
      <LinearProgress />
    </Box>
    </div>
  );
}