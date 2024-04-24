// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4CTIiipCt_xgedaYIBeNkW9JKhPVCAYg",
    authDomain: "react-journiapp.firebaseapp.com",
    projectId: "react-journiapp",
    storageBucket: "react-journiapp.appspot.com",
    messagingSenderId: "897455462541",
    appId: "1:897455462541:web:640130d33656d553346ac4"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);