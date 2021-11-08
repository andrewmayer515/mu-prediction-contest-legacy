import React from 'react';
import Button from '@mui/material/Button';

import AppBar from '../app-bar';
import FormNumber from '../form-number';
import FormPlayerNumber from '../form-player-number';

//---------------------------------------------------------------------

const App = () => {
  return (
    <>
      <AppBar />
      <FormNumber label="Total Game Points" />
      <FormNumber label="MU Points" />
      <FormNumber label="Opponent Points" />
      <FormNumber label="TO's forced by MU" />
      <FormNumber label="TO's forced by Opponent" />
      <FormNumber label="MU Total Made 3's" />
      <FormPlayerNumber primaryLabel="MU Top Scorer" secondaryLabel="How Many?" />
      <FormPlayerNumber primaryLabel="MU Top Assist Man" secondaryLabel="How Many?" />
      <FormPlayerNumber primaryLabel="MU Top Rebounder" secondaryLabel="How Many?" />
      <FormPlayerNumber primaryLabel="MU Top 3-Point Shooter" secondaryLabel="How Many?" />
      <div>
        <Button sx={{ m: 1 }} variant="contained">
          Submit
        </Button>
      </div>
    </>
  );
};

export default App;
