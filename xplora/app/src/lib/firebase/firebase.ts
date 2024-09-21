import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-ckzBjThnq7Atvj40-AMFNp9TxJT4nLw",
  authDomain: "xplora-pu.firebaseapp.com",
  projectId: "xplora-pu",
  storageBucket: "xplora-pu.appspot.com",
  messagingSenderId: "661260476299",
  appId: "1:661260476299:web:fb020b836aafde4374598e"
};

// Initialize Firebase
export const firebaseClient = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(firebaseClient);
export const auth = getAuth(firebaseClient);

// Set auth persistence
setPersistence(auth, browserLocalPersistence);

export default firebaseClient;

