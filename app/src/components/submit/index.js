import React from 'react';
import Button from '@mui/material/Button';

//---------------------------------------------------------------------

const Submit = ({ results }) => {
  const handleClick = () => {
    console.log(results);
  };

  return (
    <div>
      <Button sx={{ m: 1 }} variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

export default Submit;
