import { initializeApp } from "firebase/app";
import { getAuth } from '@firebase/auth';
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAiNy8eZY2VhH8PXEKSzrghpxx1l2barJ0",
    authDomain: "crud-app-d1237.firebaseapp.com",
    projectId: "crud-app-d1237",
    storageBucket: "crud-app-d1237.appspot.com",
    messagingSenderId: "932822748585",
    appId: "1:932822748585:web:d822f263427a67cfa288b8",
    measurementId: "G-KFK9KE1L73"
  };
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app)

