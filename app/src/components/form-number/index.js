import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { InputContext } from '../../contexts';

//---------------------------------------------------------------------

const FormNumber = ({ label, order, overrideDefault }) => {
  const { input, setInput } = useContext(InputContext);

  const handleChange = e => {
    const number = parseInt(e.target.value, 10);

    if (overrideDefault) {
      overrideDefault(number);
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
        '& > :not(style)': { my: 1, minWidth: 250 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={label} variant="outlined" onChange={handleChange} />
    </Box>
  );
};

FormNumber.propTypes = {
  label: PropTypes.string.isRequired,
  order: PropTypes.number,
  overrideDefault: PropTypes.func,
};

export default FormNumber;
