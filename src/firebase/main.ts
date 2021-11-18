// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA-jGs7eKINCcfSRU56FBh5cLTWDEWPtIs",
  authDomain: "daroo-29c00.firebaseapp.com",
  projectId: "daroo-29c00",
  storageBucket: "daroo-29c00.appspot.com",
  messagingSenderId: "744159367300",
  appId: "1:744159367300:web:674c619b3e11099dad72d1",
  measurementId: "G-2LHRYD7RCK",
};

export const myApp = initializeApp(firebaseConfig);
export const myDb = getFirestore(myApp);
export const myStorage = getStorage(myApp);
export const myAuth = getAuth(myApp);
export const googleProvider = new GoogleAuthProvider();
