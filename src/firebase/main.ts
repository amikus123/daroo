// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-jGs7eKINCcfSRU56FBh5cLTWDEWPtIs",
  authDomain: "daroo-29c00.firebaseapp.com",
  projectId: "daroo-29c00",
  storageBucket: "daroo-29c00.appspot.com",
  messagingSenderId: "744159367300",
  appId: "1:744159367300:web:674c619b3e11099dad72d1",
  measurementId: "G-2LHRYD7RCK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
