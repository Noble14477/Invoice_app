import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA0fURMqICYsD4kKcaHe-NypMFUByYB-pE",
    authDomain: "invoice-app-45826.firebaseapp.com",
    projectId: "invoice-app-45826",
    storageBucket: "invoice-app-45826.appspot.com",
    messagingSenderId: "555738814913",
    appId: "1:555738814913:web:a1185aa765d49e96a4b740",
    measurementId: "G-TK46PXWT2Y"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);