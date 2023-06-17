import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { getToken, onMessage } from 'firebase/messaging';
import { GlobalStyle, theme } from './style';
import reportWebVitals from './reportWebVitals';
import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyDNjGs_B7jtd-cMVORaQ0Jr7de1XTr5TdE',
  authDomain: 'da-whisky.firebaseapp.com',
  databaseURL: 'https://da-whisky-default-rtdb.firebaseio.com',
  projectId: 'da-whisky',
  storageBucket: 'da-whisky.appspot.com',
  messagingSenderId: '700714522444',
  appId: '1:700714522444:web:c4b65426f8225e8e5561e9',
  measurementId: 'G-G9TQB9FJYT',
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

getToken(messaging, {
  vapidKey: 'BHurO6CO7I5aITSEDN9qfNy3FzJN41n-EIzJFKRWTPK2GC28hiFMEeBXxhgZjwYp92_dL4pjIZpymrvNufrmgEc',
}).then((token) => console.log(token));

onMessage(messaging, (payload) => {
  console.log('push message: ', payload);
});

const isSupported = () => 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;

function requestPermission() {
  console.log('권한 요청 중...');
  if (isSupported()) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('알림 권한이 허용됨');

        // FCM 메세지 처리
      } else {
        console.log('알림 권한 허용 안됨');
      }
    });
  } else {
    console.log('ios이용자는 해당기능을 사용할 수 없음');
  }
}

requestPermission();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
);

reportWebVitals();
