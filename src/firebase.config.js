// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHvi4rx2S7hKnUwm_iyyZs9vp_BBiuud8",
  authDomain: "house-market-place-b8fcf.firebaseapp.com",
  projectId: "house-market-place-b8fcf",
  storageBucket: "house-market-place-b8fcf.appspot.com",
  messagingSenderId: "888091153687",
  appId: "1:888091153687:web:b399ac38a2ef2b69d21352"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();