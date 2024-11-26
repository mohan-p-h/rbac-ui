import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from '@mui/material';

const theme = createTheme({
  typography: {
    fontSize: 14,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl"> {/* Set maxWidth as per your design */}
        <App />
      </Container>
    </ThemeProvider>
  </React.StrictMode>
);
