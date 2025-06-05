import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
import admin from "firebase-admin";
import serviceAccount from "./firebaseServiceAccount.js";   


dotenv.config();

const firebaseConfig = {
  apiKey: process.env.Fire_Base_apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase app for client SDK
const Firebaseapp = initializeApp(firebaseConfig);

// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { Firebaseapp, admin };
