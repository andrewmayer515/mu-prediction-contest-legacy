import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import FormPlayer from '../form-player';
import FormNumber from '../form-number';
import { InputContext } from '../../contexts';

//---------------------------------------------------------------------

const FormPlayerNumber = ({ primaryLabel, secondaryLabel, order, overrideDefault }) => {
  const { input, setInput } = useContext(InputContext);

  const [player, setPlayer] = useState();
  const [number, setNumber] = useState();

  useEffect(() => {
    // Don't fire on initial render
    if (player && number) {
      if (overrideDefault) {
        overrideDefault({
          player,
          number,
        });
      } else {
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
      }
    }
  }, [player, number]);

  const handlePlayerChange = e => {
    setPlayer(e);
  };

  const handleNumberChange = e => {
    setNumber(e);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormPlayer label={primaryLabel} overrideDefault={handlePlayerChange} />
      <FormNumber label={secondaryLabel} overrideDefault={handleNumberChange} />
    </Box>
  );
};

FormPlayerNumber.propTypes = {
  primaryLabel: PropTypes.string.isRequired,
  secondaryLabel: PropTypes.string.isRequired,
  order: PropTypes.number,
  overrideDefault: PropTypes.func,
};

export default FormPlayerNumber;
