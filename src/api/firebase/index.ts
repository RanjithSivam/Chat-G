import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBecGRuwjjSxI11iQhrVVyd6cVGFCI3e8Y",
  authDomain: "chat-g-ddfd5.firebaseapp.com",
  projectId: "chat-g-ddfd5",
  storageBucket: "chat-g-ddfd5.appspot.com",
  messagingSenderId: "256062816183",
  appId: "1:256062816183:web:4cdbab2ad32ac3359d3232",
  measurementId: "G-DXPKPK2WLK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
export default app;
