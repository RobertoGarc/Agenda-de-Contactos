import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDpodH9HbsAg78dtwtGFOpHPR2h10R3bvk",
    authDomain: "react-fe6a0.firebaseapp.com",
    projectId: "react-fe6a0",
    storageBucket: "react-fe6a0.appspot.com",
    messagingSenderId: "640342253191",
    appId: "1:640342253191:web:dcc048869b044274e06222",
    measurementId: "G-FHXSJPXG9T"
  };
// Initialize Firebase
const fireb = firebase.initializeApp(firebaseConfig);
const store = fireb.firestore();
export {store};
