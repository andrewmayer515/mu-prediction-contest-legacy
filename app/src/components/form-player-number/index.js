import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';

import FormPlayer from '../form-player';
import FormNumber from '../form-number';
import { ResultContext, SetResultContext } from '../../contexts';

//---------------------------------------------------------------------

const FormPlayerNumber = ({ primaryLabel, secondaryLabel, order }) => {
  const results = useContext(ResultContext);
  const setResults = useContext(SetResultContext);

  const [player, setPlayer] = useState();
  const [number, setNumber] = useState();

  useEffect(() => {
    setResults({
      ...results,
      [order]: {
        text: `${primaryLabel} and how many?:`,
        answer: {
          player,
          number,
        },
        type: 'playerNumber',
      },
    });
  }, [player, number]);

  const handlePlayerChange = player => {
    setPlayer(player);
  };

  const handleNumberChange = number => {
    setNumber(number);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormPlayer label={primaryLabel} playerNumberFn={handlePlayerChange} />
      <FormNumber label={secondaryLabel} playerNumberFn={handleNumberChange} />
    </Box>
  );
};

export default FormPlayerNumber;
