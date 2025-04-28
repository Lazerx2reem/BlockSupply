// app/lib/firebase.js
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTK3Qzo2GJkj48Rx2Md1yRcajRicUwZUQ",
  authDomain: "blocksupply-259b1.firebaseapp.com",
  projectId: "blocksupply-259b1",
  storageBucket: "blocksupply-259b1.firebasestorage.app",
  messagingSenderId: "19194563199",
  appId: "1:19194563199:web:27b813440c418f78ac8d4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };