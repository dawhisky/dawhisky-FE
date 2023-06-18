import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './style';
import reportWebVitals from './reportWebVitals';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <ToastContainer position={'top-center'} autoClose={2000} hideProgressBar={'true'} limit={1} />
    <GlobalStyle />
    <App />
  </ThemeProvider>,
);

reportWebVitals();
