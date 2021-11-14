import * as React from 'react';
import AppBarComponent from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

//---------------------------------------------------------------------

function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarComponent position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MU Prediction Contest
          </Typography>
        </Toolbar>
      </AppBarComponent>
    </Box>
  );
}

export default AppBar;
