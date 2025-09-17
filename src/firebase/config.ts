// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG
) as FirebaseOptions;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const analytics = getAnalytics(app);

export { /*analytics,*/ app, auth };
