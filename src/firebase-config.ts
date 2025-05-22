/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc2K8t7As2VhEPM-SHnvKcaay-CZiqN_E",
  authDomain: "chakam-app.firebaseapp.com",
  projectId: "chakam-app",
  storageBucket: "chakam-app.firebasestorage.app",
  messagingSenderId: "338543783950",
  appId: "1:338543783950:web:460c300df912fe0ea18c5f",
  measurementId: "G-WCRJHT55EF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
