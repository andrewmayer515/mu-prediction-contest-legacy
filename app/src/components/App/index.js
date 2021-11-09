import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';

import AppBar from '../app-bar';
import PostURL from '../post-url';
import FormNumber from '../form-number';
import FormPlayerNumber from '../form-player-number';
import Submit from '../submit';
import { ResultContext, RosterContext, SetResultContext } from '../../contexts';

//---------------------------------------------------------------------

const App = () => {
  const [results, setResults] = useState({});
  const [roster, setRoster] = useState({});

  useEffect(() => {
    async function fetchRoster() {
      const { data } = await axios('http://localhost:3000/api/roster');
      console.log(data);
      setRoster(data);
    }

    fetchRoster();
  }, []);

  return (
    <ResultContext.Provider value={results}>
      <SetResultContext.Provider value={setResults}>
        <RosterContext.Provider value={roster}>
          <AppBar />
          <PostURL />
          <Divider sx={{ m: 1, my: 2 }} />
          <FormNumber label="Total Game Points" order={1} />
          <FormNumber label="MU Points" order={2} />
          <FormNumber label="Opponent Points" order={3} />
          <FormNumber label="TO's forced by MU" order={4} />
          <FormNumber label="TO's forced by Opponent" order={5} />
          <FormNumber label="MU total made 3s" order={6} />
          <FormPlayerNumber primaryLabel="MU top scorer" secondaryLabel="How Many?" order={7} />
          <FormPlayerNumber primaryLabel="MU top assist man" secondaryLabel="How Many?" order={8} />
          <FormPlayerNumber primaryLabel="MU top rebounder" secondaryLabel="How Many?" order={9} />
          <FormPlayerNumber
            primaryLabel="MU top 3-point shooter"
            secondaryLabel="How Many?"
            order={10}
          />
          <Submit results={results} />
        </RosterContext.Provider>
      </SetResultContext.Provider>
    </ResultContext.Provider>
  );
};

export default App;
