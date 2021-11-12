import React, { useState, useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { RosterContext, InputContext } from '../../contexts';
import { getPlayerOptions } from './helpers';

//---------------------------------------------------------------------

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormPlayer = ({ label, playerNumberFn }) => {
  const roster = useContext(RosterContext);
  const { input, setInput } = useContext(InputContext);

  const handleChange = (e, values) => {
    const player = values.map(value => value.value);
    if (playerNumberFn) {
      console.log(player);
      playerNumberFn(player);
    } else {
      setInput({
        ...input,
        [`question${order}`]: { text: `${label}:`, answer: player, type: 'player' },
      });
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <Autocomplete
          multiple
          getOptionLabel={option => option.value}
          onChange={handleChange}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.value}
            </li>
          )}
          options={getPlayerOptions(roster)}
          renderInput={params => <TextField {...params} label={label} />}
        />
      </FormControl>
    </>
  );
};

export default FormPlayer;
