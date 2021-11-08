import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//---------------------------------------------------------------------

export const ROSTER = {
  KAM_JONES: 'Kam Jones',
  EMARION_ELLIS: 'Emarion Ellis',
  STEVIE_MITCHELL: 'Stevie Mitchell',
  GREG_ELLIOTT: 'Greg Elliott',
  JUSTIN_LEWIS: 'Justin Lewis',
  OLIVIER_MAXENCE_PROSPER: 'Olivier-Maxence Prosper',
  OSO_IGHODARO: 'Oso Ighodaro',
  CAMERON_BROWN: 'Cameron Brown',
  TYLER_KOLEK: 'Tyler Kolek',
  DAVID_JOPLIN: 'David Joplin',
  DARRYL_MORSELL: 'Darryl Morsell',
  KUR_KUATH: 'Kur Kuath',
  KEEYAN_ITEJERE: 'Keeyan Itejere',
  BRENDAN_CARNEY: 'Brendan Carney',
  MICHAEL_KENNEDY: 'Michael Kennedy',
};

const FormPlayer = ({ label }) => {
  const [player, setPlayer] = useState('');

  const handleChange = e => {
    setPlayer(e.target.value);
  };

  const getPlayerOptions = () => {
    return Object.keys(ROSTER).map(player => {
      return {
        label: ROSTER[player],
      };
    });
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={getPlayerOptions()}
          renderInput={params => <TextField {...params} label={label} />}
        />
      </FormControl>
    </>
  );
};

export default FormPlayer;
