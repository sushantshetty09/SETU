import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQP006Bnw25IAQND_3DDlEm3hLULOEaA4",
  authDomain: "curiolab-5c4cf.firebaseapp.com",
  projectId: "curiolab-5c4cf",
  storageBucket: "curiolab-5c4cf.firebasestorage.app",
  messagingSenderId: "382541354229",
  appId: "1:382541354229:web:21f653e5a4c5d5e320a1bc",
  measurementId: "G-8VRJH52D8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export { app, analytics, auth };
