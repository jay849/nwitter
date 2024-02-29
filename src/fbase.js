// Firebase v9 이후

// firebase.js 파일
import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
// import {getAuth} from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_PROJECT_ID,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
// const db = getDatabase(firebaseApp);
// export { db };

// authService 가져오기
// export const authService = getAuth(firebaseApp);
const authService = getAuth(firebaseApp);
export { authService, createUserWithEmailAndPassword, signInWithEmailAndPassword };