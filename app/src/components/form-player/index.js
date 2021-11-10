import React, { useState, useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { RosterContext, ResultContext, SetResultContext } from '../../contexts';
import { getPlayerOptions } from './helpers';

//---------------------------------------------------------------------

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormPlayer = ({ label, playerNumberFn }) => {
  const roster = useContext(RosterContext);
  const results = useContext(ResultContext);
  const setResults = useContext(SetResultContext);

  const handleChange = (e, values) => {
    if (playerNumberFn) {
      console.log(values);
      playerNumberFn(e.target.value);
    } else {
      setResults({
        ...results,
        [order]: { text: `${label}:`, answer: number, type: 'number' },
      });
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <Autocomplete
          multiple
          getOptionLabel={option => option.label}
          onChange={handleChange}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
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
