// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}  from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1AwBh9mkR4WA2xzDCb6YBm240GLrvFnQ",
  authDomain: "todo-firebase-app-1daea.firebaseapp.com",
  projectId: "todo-firebase-app-1daea",
  storageBucket: "todo-firebase-app-1daea.appspot.com",
  messagingSenderId: "595235499743",
  appId: "1:595235499743:web:d21e870b79bd6025b8036a",
  measurementId: "G-H32EBQQTYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export {app, auth}; 