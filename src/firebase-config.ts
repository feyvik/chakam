/** @format */

// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigChakam = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

const firebaseConfigChakamImage = {
  apiKey: import.meta.env.VITE_APP_API_KEY_IMAGE,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN_IMAGE,
  projectId: import.meta.env.VITE_APP_PROJECT_ID_IMAGE,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET_IMAGE,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID_IMAGE,
  appId: import.meta.env.VITE_APP_APP_ID_IMAGE,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID_IMAGE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfigChakam);
const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
const provider = new GoogleAuthProvider();

const appB =
  getApps().find((app) => app.name === "Uploader") ||
  initializeApp(firebaseConfigChakamImage, "Uploader");

export const storage = getStorage(appB);
const authAppImage = getAuth(appB);

export { auth, provider, signInWithPopup, signOut, authAppImage };
