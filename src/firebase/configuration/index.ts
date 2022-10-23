import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyDq95FmpOWY3HLyitpcK_YlY9i4dfNOZS8",
    authDomain: "fir-tasks-5cff9.firebaseapp.com",
    projectId: "fir-tasks-5cff9",
    storageBucket: "fir-tasks-5cff9.appspot.com",
    messagingSenderId: "650091404793",
    appId: "1:650091404793:web:e5e41d30053f8c47ca7128",
    measurementId: "G-X8J2N9RF6E"
  };

export const firebaseApp = initializeApp(firebaseConfig);
export const databseInstance = getFirestore(firebaseApp);

