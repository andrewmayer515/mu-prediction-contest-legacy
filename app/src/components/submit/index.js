import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

import { InputContext, ResultContext } from '../../contexts';
import { sortObject } from './helpers';

//---------------------------------------------------------------------

const Submit = () => {
  const { input } = useContext(InputContext);
  const { setResult } = useContext(ResultContext);

  const handleClick = async () => {
    const { data } = await axios.post('http://localhost:3000/api/results', sortObject(input));
    setResult(data);
  };

  return (
    <div>
      <Button sx={{ m: 1 }} variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

export default Submit;
