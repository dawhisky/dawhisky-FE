import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './style';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <ToastContainer position={'top-center'} autoClose={1500} hideProgressBar={'true'} limit={1} />
    <GlobalStyle />
    <App />
  </ThemeProvider>,
);

serviceWorkerRegistration.register();

reportWebVitals();
