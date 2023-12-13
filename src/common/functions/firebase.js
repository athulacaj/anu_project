// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAhfKC_JLDChIdZieu_Dc4IGMkq3S8JWQ8",
  authDomain: "testvideo-c4c3a.firebaseapp.com",
  projectId: "testvideo-c4c3a",
  storageBucket: "testvideo-c4c3a.appspot.com",
  messagingSenderId: "923139602839",
  appId: "1:923139602839:web:4383d621c4e94a063dacd2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const messaging = getMessaging(app);

// fierbase messaging
const apiKey =
  "BMYtO-5oQ-_V4jVgNBoMsOAIcMFKV8PRXfzbtFbJrXta77iE6_9aBO7HugAZmn6yfuMO7hkl93-xs3ecl0agFzI";

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}

async function getFcmToken() {
  try {
    // await messaging.requestPermission();
    // console.log('Notification permission granted.');
    const token = await getToken(messaging, { vapidKey: apiKey });
    console.log(token);
  } catch (error) {
    requestPermission();
    console.log("error: ", error);
  }
}

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });
getFcmToken();

export { auth, db, messaging };
