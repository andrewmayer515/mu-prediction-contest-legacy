import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { ResultContext, SetResultContext } from '../../contexts';

//---------------------------------------------------------------------

const FormNumber = ({ label, order, playerNumberFn }) => {
  const results = useContext(ResultContext);
  const setResults = useContext(SetResultContext);

  const handleChange = e => {
    const number = parseInt(e.target.value);

    if (playerNumberFn) {
      playerNumberFn(number);
    } else {
      setResults({
        ...results,
        [order]: { text: `${label}:`, answer: number, type: 'number' },
      });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, minWidth: 250 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={label} variant="outlined" onChange={handleChange} />
    </Box>
  );
};

export default FormNumber;
