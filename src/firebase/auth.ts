import {
  // browserLocalPersistence,
  createUserWithEmailAndPassword,
  // GoogleAuthProvider,
  // setPersistence,
  signInWithEmailAndPassword,
  // signInWithPopup,
} from "firebase/auth";

import { auth } from "./config";

export const signUpWithEmailAndPassWord = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPassWord = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// export const signInWWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   return result;
// };

// export const signOut = async () => {
//   return auth.signOut();
// };

// export const setUserPersistence = async () => {
//   await setPersistence(auth, browserLocalPersistence);
// };
