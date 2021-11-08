import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//---------------------------------------------------------------------

const FormNumber = ({ label }) => {
  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, minWidth: 250 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label={label} variant="outlined" />
      </Box>
    </>
  );
};

export default FormNumber;
