// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbmLByEPvTzqNev0KU0M7j2NXtB2LpVEg",
  authDomain: "react-sm-project-cdc33.firebaseapp.com",
  projectId: "react-sm-project-cdc33",
  storageBucket: "react-sm-project-cdc33.firebasestorage.app",
  messagingSenderId: "464156712910",
  appId: "1:464156712910:web:9bcf43d2ad06401cdbd59f",
  measurementId: "G-PF2ZK0ECZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);