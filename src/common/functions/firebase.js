// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAhfKC_JLDChIdZieu_Dc4IGMkq3S8JWQ8",
    authDomain: "testvideo-c4c3a.firebaseapp.com",
    projectId: "testvideo-c4c3a",
    storageBucket: "testvideo-c4c3a.appspot.com",
    messagingSenderId: "923139602839",
    appId: "1:923139602839:web:4383d621c4e94a063dacd2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

 const auth = getAuth();


export { auth, db };
