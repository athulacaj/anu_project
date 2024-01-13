/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

const firebaseConfig = {
    apiKey: "AIzaSyAhfKC_JLDChIdZieu_Dc4IGMkq3S8JWQ8",
    authDomain: "testvideo-c4c3a.firebaseapp.com",
    projectId: "testvideo-c4c3a",
    storageBucket: "testvideo-c4c3a.appspot.com",
    messagingSenderId: "923139602839",
    appId: "1:923139602839:web:4383d621c4e94a063dacd2",
  };


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
