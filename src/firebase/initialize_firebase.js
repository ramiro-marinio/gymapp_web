// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIlDWDKtFsKC96nCrAb4mCHbbWib1aW70",
  authDomain: "better-training-6a48a.firebaseapp.com",
  projectId: "better-training-6a48a",
  storageBucket: "better-training-6a48a.appspot.com",
  messagingSenderId: "347973756253",
  appId: "1:347973756253:web:cb53e61b0f4be6dff0f4b4",
  measurementId: "G-WBEM30WNX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);