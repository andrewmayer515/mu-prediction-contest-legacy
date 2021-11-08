import React from 'react';
import Box from '@mui/material/Box';
import FormPlayer from '../form-player';
import FormNumber from '../form-number';

//---------------------------------------------------------------------

const FormPlayerNumber = ({ primaryLabel, secondaryLabel }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <FormPlayer label={primaryLabel} />
      <FormNumber label={secondaryLabel} />
    </Box>
  );
};

export default FormPlayerNumber;
