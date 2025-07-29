import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApuR6-Ut0A05PJ0u_QPSgyTIQmf77vfPg",
  authDomain: "rws-workshop.firebaseapp.com",
  projectId: "rws-workshop",
  storageBucket: "rws-workshop.firebasestorage.app",
  messagingSenderId: "149518126478",
  appId: "1:149518126478:web:380a2f6633fcb86ad4e8df",
  measurementId: "G-6PGG98DPKW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

