import React from 'react';
import { render } from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './components/App';

//---------------------------------------------------------------------

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366',
    },
  },
});

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

// eslint-disable-next-line no-undef
render(<Root />, document.getElementById('container'));
