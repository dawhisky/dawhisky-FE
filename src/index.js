import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
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

const firebaseConfig = {
  apiKey: 'AIzaSyDNjGs_B7jtd-cMVORaQ0Jr7de1XTr5TdE',
  authDomain: 'da-whisky.firebaseapp.com',
  projectId: 'da-whisky',
  storageBucket: 'da-whisky.appspot.com',
  messagingSenderId: '700714522444',
  appId: '1:700714522444:web:c4b65426f8225e8e5561e9',
  measurementId: 'G-G9TQB9FJYT',
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

reportWebVitals();
