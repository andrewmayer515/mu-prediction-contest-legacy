import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { InputContext } from '../../contexts';

//---------------------------------------------------------------------

const FormNumber = ({ label, order, playerNumberFn }) => {
  const { input, setInput } = useContext(InputContext);

  const handleChange = e => {
    const number = parseInt(e.target.value);

    if (playerNumberFn) {
      playerNumberFn(number);
    } else {
      setInput({
        ...input,
        [`question${order}`]: { text: `${label}:`, answer: number, type: 'number' },
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
