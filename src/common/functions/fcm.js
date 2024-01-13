// import { initializeApp } from "firebase/app";
// import { getMessaging,onBackgroundMessage } from "firebase/messaging/sw";

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object

// const firebaseConfig = {
//     apiKey: "AIzaSyAhfKC_JLDChIdZieu_Dc4IGMkq3S8JWQ8",
//     authDomain: "testvideo-c4c3a.firebaseapp.com",
//     projectId: "testvideo-c4c3a",
//     storageBucket: "testvideo-c4c3a.appspot.com",
//     messagingSenderId: "923139602839",
//     appId: "1:923139602839:web:4383d621c4e94a063dacd2",
//   };


// const firebaseApp = initializeApp(firebaseConfig);


// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging();



// function initBackgroundMessage() {
//   onBackgroundMessage(messaging, (payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
  
//     // eslint-disable-next-line no-restricted-globals
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
// }

// export { initBackgroundMessage };