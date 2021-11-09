import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';

import FormPlayer from '../form-player';
import FormNumber from '../form-number';
import { ResultContext, SetResultContext } from '../../contexts';

//---------------------------------------------------------------------

const FormPlayerNumber = ({ primaryLabel, secondaryLabel }) => {
  const results = useContext(ResultContext);
  const setResults = useContext(SetResultContext);

  const [player, setPlayer] = useState();
  const [number, setNumber] = useState();

  const handlePlayerChange = e => {
    setPlayer({
      ...results,
      [order]: {
        text: `${label} and how many:`,
      },
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormPlayer label={primaryLabel} />
      <FormNumber label={secondaryLabel} />
    </Box>
  );
};

export default FormPlayerNumber;
