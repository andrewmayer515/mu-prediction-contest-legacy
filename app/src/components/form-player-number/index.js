import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';

import FormPlayer from '../form-player';
import FormNumber from '../form-number';
import { InputContext } from '../../contexts';

//---------------------------------------------------------------------

const FormPlayerNumber = ({ primaryLabel, secondaryLabel, order }) => {
  const { input, setInput } = useContext(InputContext);

  const [player, setPlayer] = useState();
  const [number, setNumber] = useState();

  useEffect(() => {
    setInput({
      ...input,
      [`question${order}`]: {
        text: `${primaryLabel} and how many:`,
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
