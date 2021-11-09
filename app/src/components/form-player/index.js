import React, { useState, useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { RosterContext } from '../../contexts';
import { getPlayerOptions } from './helpers';

//---------------------------------------------------------------------

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormPlayer = ({ label }) => {
  const roster = useContext(RosterContext);
  const [player, setPlayer] = useState('');

  const handleChange = e => {
    setPlayer(e.target.value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <Autocomplete
          multiple
          disableCloseOnSelect
          getOptionLabel={option => option.label}
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
