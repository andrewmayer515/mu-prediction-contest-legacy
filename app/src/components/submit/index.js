import React, { useContext, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';

import { InputContext, ResultContext } from '../../contexts';
import { sortObject } from './helpers';

//---------------------------------------------------------------------

const Submit = () => {
  const { input } = useContext(InputContext);
  const { setResult } = useContext(ResultContext);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { data } = await axios.post('http://localhost:3000/api/results', sortObject(input));
    setLoading(false);
    setResult(data);
  };

  return (
    <div>
      <LoadingButton sx={{ m: 1 }} variant="contained" loading={loading} onClick={handleClick}>
        Submit
      </LoadingButton>
    </div>
  );
};

export default Submit;
