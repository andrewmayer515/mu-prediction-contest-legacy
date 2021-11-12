import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { InputContext } from '../../contexts';

//---------------------------------------------------------------------

const PostURL = () => {
  const { input, setInput } = useContext(InputContext);

  const handleChange = e => {
    setInput({
      ...input,
      url: e.target.value,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, mt: 2, minWidth: 500 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="MU Scoop Post URL"
        variant="outlined"
        onChange={handleChange}
      />
    </Box>
  );
};

export default PostURL;
