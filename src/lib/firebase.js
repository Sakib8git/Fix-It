import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ9GRHYpEUvSwpn8SHJugoYgt4p5xAGNw",
  authDomain: "fixit-883d9.firebaseapp.com",
  projectId: "fixit-883d9",
  storageBucket: "fixit-883d9.firebasestorage.app",
  messagingSenderId: "422772730848",
  appId: "1:422772730848:web:897719c6d6170369e85985",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
